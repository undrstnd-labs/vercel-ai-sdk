import { LanguageModelV1, ProviderV1 } from '@ai-sdk/provider';
import {
  FetchFunction,
  loadApiKey,
  withoutTrailingSlash,
} from '@ai-sdk/provider-utils';
import { UndrstndChatLanguageModel } from './undrstnd-chat-language-model';
import {
  UndrstndChatModelId,
  UndrstndChatSettings,
} from './undrstnd-chat-settings';

export interface UndrstndProvider extends ProviderV1 {
  (
    modelId: UndrstndChatModelId,
    settings?: UndrstndChatSettings,
  ): LanguageModelV1;

  /**
Creates a model for text generation.
*/
  languageModel(
    modelId: UndrstndChatModelId,
    settings?: UndrstndChatSettings,
  ): LanguageModelV1;

  /**
Creates a model for text generation.
*/
  chat(
    modelId: UndrstndChatModelId,
    settings?: UndrstndChatSettings,
  ): LanguageModelV1;
}

export interface UndrstndProviderSettings {
  /**
Use a different URL prefix for API calls, e.g. to use proxy servers.
The default prefix is `https://api.undrstnd-labs.com/v1`.
   */
  baseURL?: string;

  /**
@deprecated Use `baseURL` instead.
   */
  baseUrl?: string;

  /**
API key that is being send using the `Authorization` header.
It defaults to the `UNDRSTND_API_KEY` environment variable.
   */
  apiKey?: string;

  /**
Custom headers to include in the requests.
     */
  headers?: Record<string, string>;

  /**
Custom fetch implementation. You can use it as a middleware to intercept requests,
or to provide a custom fetch implementation for e.g. testing.
    */
  fetch?: FetchFunction;
}

/**
Create a Undrstnd AI provider instance.
 */
export function createUndrstnd(
  options: UndrstndProviderSettings = {},
): UndrstndProvider {
  const baseURL =
    withoutTrailingSlash(options.baseURL ?? options.baseUrl) ??
    'https://api.undrstnd-labs.com/v1';

  const getHeaders = () => ({
    Authorization: `Bearer ${loadApiKey({
      apiKey: options.apiKey,
      environmentVariableName: 'UNDRSTND_API_KEY',
      description: 'Undrstnd',
    })}`,
    ...options.headers,
  });

  const createChatModel = (
    modelId: UndrstndChatModelId,
    settings: UndrstndChatSettings = {},
  ) =>
    new UndrstndChatLanguageModel(modelId, settings, {
      provider: 'undrstnd.chat',
      baseURL,
      headers: getHeaders,
      fetch: options.fetch,
    });

  const provider = function (
    modelId: UndrstndChatModelId,
    settings?: UndrstndChatSettings,
  ) {
    if (new.target) {
      throw new Error(
        'The Undrstnd model function cannot be called with the new keyword.',
      );
    }

    return createChatModel(modelId, settings);
  };

  provider.languageModel = createChatModel;
  provider.chat = createChatModel;

  return provider as UndrstndProvider;
}

/**
Default Undrstnd provider instance.
 */
export const undrstnd = createUndrstnd();
