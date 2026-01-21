"use client";

import { usePutProfileMe } from "@/infrastructure/kubb";

export type PutProfileMeFormPayload = {
  firstName: string;
  lastName: string;
  country: string;
  dob?: string; 
  photoProfile?: File;
};

export function usePutProfileMeForm() {
  const mutation = usePutProfileMe();

  const mutate = (payload: PutProfileMeFormPayload) => {
    const formData = new FormData();

    formData.append("firstName", payload.firstName);
    formData.append("lastName", payload.lastName);
    formData.append("country", payload.country);

    if (payload.dob) {
      formData.append("dob", payload.dob);
    }

    if (payload.photoProfile) {
      formData.append("photoProfile", payload.photoProfile);
    }

    mutation.mutate({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: formData as any,
    });
  };

  return {
    ...mutation,
    mutate,
  };
}
