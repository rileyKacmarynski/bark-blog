import { LoremIpsum } from 'lorem-ipsum'

export const getContent = () => {
  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4,
    },
    wordsPerSentence: {
      max: 16,
      min: 4,
    },
  })

  lorem.format = 'html'
  return lorem.generateParagraphs(5)
}
