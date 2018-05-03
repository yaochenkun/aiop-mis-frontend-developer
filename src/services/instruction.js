import request from '../utils/request';
import { ACCESS_TOKEN } from '../common/config';

export async function invokeWordSeg(params) {
  return request('/restapi/nlp/v1/word_seg', {
    method: 'POST',
    headers: { ACCESS_TOKEN },
    body: params,
  });
}

export async function invokeWordPos(params) {
  return request('/restapi/nlp/v1/word_pos', {
    method: 'POST',
    headers: { ACCESS_TOKEN },
    body: params,
  });
}

export async function invokeWordNer(params) {
  return request('/restapi/nlp/v1/word_ner', {
    method: 'POST',
    headers: { ACCESS_TOKEN },
    body: params,
  });
}

export async function invokeDependencyParse(params) {
  return request('/restapi/nlp/v1/dependency_parse', {
    method: 'POST',
    headers: { ACCESS_TOKEN },
    body: params,
  });
}

export async function invokeTextKeywords(params) {
  return request('/restapi/nlp/v1/text_keywords', {
    method: 'POST',
    headers: { ACCESS_TOKEN },
    body: params,
  });
}

export async function invokeTextSummaries(params) {
  return request('/restapi/nlp/v1/text_summaries', {
    method: 'POST',
    headers: { ACCESS_TOKEN },
    body: params,
  });
}

export async function invokeTextPhrases(params) {
  return request('/restapi/nlp/v1/text_phrases', {
    method: 'POST',
    headers: { ACCESS_TOKEN },
    body: params,
  });
}

export async function invokeWord2Vec(params) {
  return request('/restapi/nlp/v1/word_2_vec', {
    method: 'POST',
    headers: { ACCESS_TOKEN },
    body: params,
  });
}

export async function invokeWord2Pinyin(params) {
  return request('/restapi/nlp/v1/word_2_pinyin', {
    method: 'POST',
    headers: { ACCESS_TOKEN },
    body: params,
  });
}

export async function invokeSimplified2Traditional(params) {
  return request('/restapi/nlp/v1/simplified_2_traditional', {
    method: 'POST',
    headers: { ACCESS_TOKEN },
    body: params,
  });
}

export async function invokeTraditional2Simplified(params) {
  return request('/restapi/nlp/v1/traditional_2_simplified', {
    method: 'POST',
    headers: { ACCESS_TOKEN },
    body: params,
  });
}

export async function invokeWordSim(params) {
  return request('/restapi/nlp/v1/word_sim', {
    method: 'POST',
    headers: { ACCESS_TOKEN },
    body: params,
  });
}

export async function invokeDocumentSim(params) {
  return request('/restapi/nlp/v1/document_sim', {
    method: 'POST',
    headers: { ACCESS_TOKEN },
    body: params,
  });
}

export async function invokeNearestWords(params) {
  return request('/restapi/nlp/v1/nearest_words', {
    method: 'POST',
    headers: { ACCESS_TOKEN },
    body: params,
  });
}

export async function invokeTextSuggester(params) {
  return request('/restapi/nlp/v1/text_suggester', {
    method: 'POST',
    headers: { ACCESS_TOKEN },
    body: params,
  });
}

export async function invokeMotionClassify(params) {
  return request('/restapi/nlp/v1/motion_classify', {
    method: 'POST',
    headers: { ACCESS_TOKEN },
    body: params,
  });
}

export async function invokeCategoryClassify(params) {
  return request('/restapi/nlp/v1/category_classify', {
    method: 'POST',
    headers: { ACCESS_TOKEN },
    body: params,
  });
}

export async function invokeFaceSim(params) {
  return request('/restapi/image/v1/face_sim', {
    method: 'POST',
    headers: { ACCESS_TOKEN },
    body: params,
  });
}
