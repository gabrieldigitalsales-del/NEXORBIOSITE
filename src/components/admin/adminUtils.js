import { toast } from 'sonner';

export async function runAdminAction(action, { onSuccess, successMessage = 'Salvo com sucesso.', errorMessage = 'Nao foi possivel salvar.' } = {}) {
  try {
    const result = await action();
    if (onSuccess) await onSuccess(result);
    if (successMessage) toast.success(successMessage);
    return result;
  } catch (error) {
    console.error(error);
    toast.error(error?.message || errorMessage);
    throw error;
  }
}

export async function refreshQueries(queryClient, queryKey) {
  await queryClient.invalidateQueries({ queryKey });
  await queryClient.refetchQueries({ queryKey, type: 'active' });
}
