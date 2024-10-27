// https://docs.undrstnd-labs.com/getting-started/models/models_overview/
export type UndrstndChatModelId =
  // premier
  | 'ministral-3b-latest'
  | 'ministral-8b-latest'
  | 'mistral-large-latest'
  | 'mistral-small-latest'
  // free
  | 'pixtral-12b-2409'
  // legacy
  | 'open-mistral-7b'
  | 'open-mixtral-8x7b'
  | 'open-mixtral-8x22b'
  | (string & {});

export interface UndrstndChatSettings {
  /**
Whether to inject a safety prompt before all conversations.

Defaults to `false`.
   */
  safePrompt?: boolean;
}
