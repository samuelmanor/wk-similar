### api notes

get all kanji for user:
https://api.wanikani.com/v2/assignments?subject_types=kanji

a specific kanji:
https://api.wanikani.com/v2/subjects/479/
then visually_similar_subject_ids: []

function getSecondsUntilNextMinute() {
const now = new Date();
const seconds = now.getSeconds();
return 60 - seconds;
}
