import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';

import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, AIMessage, SystemMessage } from '@langchain/core/messages';
import { ChatMessageHistory } from "langchain/stores/message/in_memory";
import { Difficulty } from '../../models/options.model';

@Injectable({
  providedIn: 'root',
})
export class LingoService {
  private chatModel: ChatOpenAI;
  private chatHistory: ChatMessageHistory;

  private systemMessage: string = `You are an assistant for a word game.
  - When asked for a word, ONLY return a single word, with NO quotes, NO punctuation, and NO extra text. Do NOT say anything else.
  - When asked for a word, select it from a truly random position in the word list each time, not just from the start or the same area each time.
  - When validating a word, ONLY return "true" or "false" (all lowercase, no punctuation, no extra text).
  - The word list is: https://raw.githubusercontent.com/sindresorhus/word-list/refs/heads/main/words.txt
  - Do not reuse words you have already sent.
  - Words cannot end in "S" or "ES" for plural nouns.
  - Words cannot end in "ED" for past-tense verbs.
  - Difficulty:
    - Easy: Commonly used words, no repeated letters.
    - Medium: Less common words, may have one repeated letter.
    - Hard: Uncommon words, encouraged to have repeated letters.
  - Word Length: The word you return must be of the length specified.
  - When you get a "Validate word" prompt, check that the word exists in the list (case insensitive), and ONLY return "true" or "false".`;

  constructor() {
    this.chatModel = new ChatOpenAI({
      openAIApiKey: environment.OPENAI_API_KEY,
      temperature: 0.2,
    });
    this.chatHistory = new ChatMessageHistory();
    this.chatHistory.addMessage(new SystemMessage(this.systemMessage));
  }

  async promptWithHistory(prompt: string): Promise<string> {
    this.chatHistory.addMessage(new HumanMessage(prompt));
    const messages = await this.chatHistory.getMessages();
    const response = await this.chatModel.invoke(messages);
    this.chatHistory.addMessage(new AIMessage(response.text));
    console.log(response);
    return response.text;
  }

  async generateTargetWord(difficulty: Difficulty, wordLength: number): Promise<string> {
    const prompt = `Next word. Word length: ${wordLength}. Difficulty: ${difficulty}.`;
    return await this.promptWithHistory(prompt);
  }

  async validateWord(word: string): Promise<boolean> {
    const prompt = `Validate word: ${word}`;
    const response = await this.promptWithHistory(prompt);
    return response.trim().toLowerCase() === 'true';
  }
}