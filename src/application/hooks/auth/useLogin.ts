import { usePostAuthLogin } from "@/infrastructure/kubb";
import type { PostAuthLoginMutationRequest, PostAuthLoginMutationResponse, PostAuthLogin401 } from "@/infrastructure/kubb"; 

export function useLogin() {
  const { mutateAsync, ...rest } = usePostAuthLogin();

  const login = async (payload: PostAuthLoginMutationRequest) => {
    return mutateAsync({ data: payload });
  };

  return { login, ...rest };
}
