import { loadApiKey, withoutTrailingSlash } from '@ai-sdk/provider-utils';
import { UndrstndChatLanguageModel } from './undrstnd-chat-language-model';
import {
  UndrstndChatModelId,
  UndrstndChatSettings,
} from './undrstnd-chat-settings';
import { UndrstndProviderSettings } from './undrstnd-provider';

/**
 * @deprecated Use `createUndrstnd` instead.
 */
export class Undrstnd {
  /**
   * Base URL for the Undrstnd API calls.
   */
  readonly baseURL: string;

  readonly apiKey?: string;

  readonly headers?: Record<string, string>;

  /**
   * Creates a new Undrstnd provider instance.
   */
  constructor(options: UndrstndProviderSettings = {}) {
    this.baseURL =
      withoutTrailingSlash(options.baseURL ?? options.baseUrl) ??
      'https://api.mistral.ai/v1';

    this.apiKey = options.apiKey;
    this.headers = options.headers;
  }

  private get baseConfig() {
    return {
      baseURL: this.baseURL,
      headers: () => ({
        Authorization: `Bearer ${loadApiKey({
          apiKey: this.apiKey,
          environmentVariableName: 'MISTRAL_API_KEY',
          description: 'Undrstnd',
        })}`,
        ...this.headers,
      }),
    };
  }

  chat(modelId: UndrstndChatModelId, settings: UndrstndChatSettings = {}) {
    return new UndrstndChatLanguageModel(modelId, settings, {
      provider: 'mistral.chat',
      ...this.baseConfig,
    });
  }
}
