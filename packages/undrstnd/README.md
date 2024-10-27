# AI SDK - Undrstnd Provider

The **[Undrstnd provider](https://sdk.vercel.ai/providers/ai-sdk-providers/undrstnd)** for the [AI SDK](https://sdk.vercel.ai/docs) contains language model support for the Undrstnd chat API.

## Setup

The Undrstnd provider is available in the `@ai-sdk/undrstnd` module. You can install it with

```bash
npm i @ai-sdk/undrstnd
```

## Provider Instance

You can import the default provider instance `undrstnd` from `@ai-sdk/undrstnd`:

```ts
import { undrstnd } from '@ai-sdk/undrstnd';
```

## Example

```ts
import { undrstnd } from '@ai-sdk/undrstnd';
import { generateText } from 'ai';

const { text } = await generateText({
  model: undrstnd('llama3-8b-8192'),
  prompt: 'Write about the history of the internet.',
});
```

## Documentation

Please check out the **[Undrstnd provider](https://sdk.vercel.ai/providers/ai-sdk-providers/undrstnd)** for more information.
