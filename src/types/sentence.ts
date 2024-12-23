export interface SentencePart {
  text: string;
  isMain: boolean;
  position: number;
}

export interface Sentence {
  text: string;
  mainClause: string;
  dependentClause: string;
  explanation: string;
  order: {
    mainClausePosition: number;
    dependentClausePosition: number;
  };
}

export interface SentenceSegment {
  text: string;
  isMain: boolean;
}

export interface DragBlob {
  type: 'main' | 'dependent';
  color: string;
}

export interface VedlejsiVetaSentence {
  text: string;
  type: string;
  question: string;
  explanation: string;
  typeExplanation: string;
}

export interface VedlejsiVetaType {
  type: string;
  color: string;
}
