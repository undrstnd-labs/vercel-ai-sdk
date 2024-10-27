export type UndrstndPrompt = Array<UndrstndMessage>;

export type UndrstndMessage =
  | UndrstndSystemMessage
  | UndrstndUserMessage
  | UndrstndAssistantMessage
  | UndrstndToolMessage;

export interface UndrstndSystemMessage {
  role: 'system';
  content: string;
}

export interface UndrstndUserMessage {
  role: 'user';
  content: Array<UndrstndUserMessageContent>;
}

export type UndrstndUserMessageContent =
  | UndrstndUserMessageTextContent
  | UndrstndUserMessageImageContent;

export interface UndrstndUserMessageImageContent {
  type: 'image_url';
  image_url: string;
}

export interface UndrstndUserMessageTextContent {
  type: 'text';
  text: string;
}

export interface UndrstndAssistantMessage {
  role: 'assistant';
  content: string;
  prefix?: boolean;
  tool_calls?: Array<{
    id: string;
    type: 'function';
    function: { name: string; arguments: string };
  }>;
}

export interface UndrstndToolMessage {
  role: 'tool';
  name: string;
  content: string;
  tool_call_id: string;
}
