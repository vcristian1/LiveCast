"use server"; //Since this is a server action

// Import necessary modules from livekit-server-sdk and other libraries
import {
  IngressAudioEncodingPreset,
  IngressInput,
  IngressClient,
  IngressVideoEncodingPreset,
  RoomServiceClient,
  type CreateIngressOptions,
} from "livekit-server-sdk";

import { TrackSource } from "livekit-server-sdk/dist/proto/livekit_models";

import { db } from "@/lib/db";
import { getSelf } from "@/lib/auth-service";
import { revalidatePath } from "next/cache";

// Create instances of RoomServiceClient and IngressClient
const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!,
);

const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL!);

// Function to reset ingresses for a host
export const resetIngresses = async (hostIdentity: string) => {
  // List all ingresses for the host
  const ingresses = await ingressClient.listIngress({
    roomName: hostIdentity,
  });

  // List all rooms for the host
  const rooms = await roomService.listRooms([hostIdentity]);

  // Delete all rooms for the host
  for (const room of rooms) {
    await roomService.deleteRoom(room.name);
  }

  // Delete all ingresses for the host
  for (const ingress of ingresses) {
    if (ingress.ingressId) {
      await ingressClient.deleteIngress(ingress.ingressId);
    }
  }
};

// Function to create a new ingress
export const createIngress = async (ingressType: IngressInput) => {
  // Get the user's identity
  const self = await getSelf();

  // Reset ingresses for the user
  await resetIngresses(self.id);

  // Define options for creating the ingress
  const options: CreateIngressOptions = {
    name: self.username,
    roomName: self.id,
    participantName: self.username,
    participantIdentity: self.id,
  };

  // Set options based on the ingress type
  if (ingressType === IngressInput.WHIP_INPUT) {
    options.bypassTranscoding = true;
  } else {
    options.video = {
      source: TrackSource.CAMERA,
      preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
    };
    options.audio = {
      source: TrackSource.MICROPHONE,
      preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS
    };
  };

  // Create the ingress
  const ingress = await ingressClient.createIngress(
    ingressType,
    options,
  );

  // If creation fails, throw an error
  if (!ingress || !ingress.url || !ingress.streamKey) {
    throw new Error("Failed to create ingress");
  }

  // Update the database with the new ingress information
  await db.stream.update({
    where: { userId: self.id },
    data: {
      ingressId: ingress.ingressId,
      serverUrl: ingress.url,
      streamKey: ingress.streamKey,
    },
  });

  // Revalidate the path for cache invalidation
  revalidatePath(`/u/${self.username}/keys`);

  // Return the created ingress
  return ingress;
};
