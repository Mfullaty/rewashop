import type { Api } from "./api";
import type { Draft, DraftPayload, Intent, SaleResult } from "./types";
// A prepared sale is persisted on the server BEFORE the first financial POST.
// The browser stores only its scoped draft ID, never contact/payment payloads.
export async function persistDraft(
    api: Api,
    draft: Pick<Draft, "id" | "revision">,
    label: string,
    payload: DraftPayload,
) {
    return api.mutate<{ id: string; revision: number }>(
        `drafts/${draft.id}`,
        { label, revision: draft.revision, payload },
        "PUT",
        true,
    );
}
export async function submitIntent(
    api: Api,
    intent: Intent,
): Promise<SaleResult> {
    return api.mutate<SaleResult>(
        "sales",
        intent.payload,
        "POST",
        false,
        intent.key,
    );
}
