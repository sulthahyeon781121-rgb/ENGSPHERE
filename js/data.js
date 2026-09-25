export const STORAGE_KEY = 'engsphere-state';

export const DEFAULT_STATE = {
  isLoggedIn: false,
  theme: 'dark',
  lang: 'en',
  level: 1,
  xp: 0,
  streak: 0,
  lastActiveDay: null,
  history: [],
  currentView: 'dashboard',
  selectedMaterial: 'tenses',
  selectedTopic: 'mixed',
  selectedDifficulty: 'intermediate',
  selectedAIQuestions: 5,
  openTense: null,
  reviewQuestions: [],
  reviewFilter: 'all',
  users: [{ id: 'usr_default', name: 'Learner', initials: 'L', email: 'learner@engsphere.app', password: '', level: 'intermediate', goal: 'conversation' }],
  profiles: [{ name: 'Learner', initials: 'L', email: 'learner@engsphere.app' }],
  activeProfile: 0,
  personalizedLearning: { goal: 'conversation', level: 'intermediate', dailyXpGoal: 100, customNotes: '' }
};

export const TENSES = [
  ['Present','Simple','Present Simple','S + V1 (+ s/es)',['Habits and routines','General facts and truths'],['She works at a hospital.','Water boils at 100°C.']],
  ['Present','Continuous','Present Continuous','S + am/is/are + V-ing',['Happening right now','Temporary situations'],['I am studying for an exam.','He is staying with friends this month.']],
  ['Present','Perfect','Present Perfect','S + have/has + V3',['Past action with a present result','Experience, time unspecified'],['I have finished the report.','She has visited Japan twice.']],
  ['Past','Simple','Past Simple','S + V2',['Completed past action','Series of past events'],['We saw a film yesterday.','I lived abroad as a child.']],
  ['Past','Continuous','Past Continuous','S + was/were + V-ing',['Action in progress at a past point','Interrupted past action'],['I was cooking at 8 p.m.','She was reading when the phone rang.']],
  ['Past','Perfect','Past Perfect','S + had + V3',['Before another past event'],['The train had left when we arrived.']],
  ['Future','Simple','Future Simple (will)','S + will + V1',['Spontaneous decision','Prediction or promise'],['I will help you with that.']],
  ['Future','Continuous','Future Continuous','S + will be + V-ing',['Action in progress at a future moment'],['I will be flying tomorrow.']],
  ['Future','Perfect','Future Perfect','S + will have + V3',['Completed before a future point'],['She will have finished by Friday.']],
  ['Future','Perfect Continuous','Future Perfect Continuous','S + will have been + V-ing',['Duration up to a future point'],['I will have been working here for five years.']]
].map(([time, aspect, name, formula, uses, ex]) => ({ time, aspect, name, formula, uses, ex }));

export const VOCAB = {
  'Daily life': [{ w:'chore', p:'noun', m:'a routine household task', e:'Doing the laundry is my least favorite chore.' }, { w:'errand', p:'noun', m:'a short trip to do a job', e:'I have to run a few errands.' }],
  'Work & study': [{ w:'deadline', p:'noun', m:'the latest time something must be done', e:'The deadline is tomorrow.' }, { w:'feedback', p:'noun', m:'helpful information about performance', e:'Feedback helps learners improve.' }],
  Travel: [{ w:'itinerary', p:'noun', m:'a planned route or journey', e:'Our itinerary includes Tokyo.' }, { w:'fare', p:'noun', m:'money paid for public transport', e:'Bus fares are discounted.' }],
  Feelings: [{ w:'relieved', p:'adjective', m:'happy that something unpleasant ended', e:'She was relieved to hear the news.' }, { w:'grateful', p:'adjective', m:'appreciative of kindness', e:'I am grateful for your support.' }]
};

const question = (q, options, answer, explain, id) => ({ q, options, answer, explain, id });
export const BANK = {
  tenses: {
    beginner: [question('She ____ to school every day.', ['go','goes','going','gone'], 1, 'Present Simple with she adds -s.', 'ten-b-1'), question('Yesterday I ____ a new book.', ['buy','buys','bought','buying'], 2, 'Yesterday indicates Past Simple.', 'ten-b-2')],
    intermediate: [question('By the time we arrived, the film ____.', ['started','has started','had started','was starting'], 2, 'Past Perfect marks the earlier past action.', 'ten-i-1')],
    advanced: [question('Hardly ____ the door when the phone rang.', ['I had closed','had I closed','I closed','did I close'], 1, 'Negative adverbials require inversion.', 'ten-a-1')]
  },
  grammar: { beginner: [question('She bought ____ apple.', ['a','an','the','some'], 1, 'Use an before a vowel sound.', 'grm-b-1')] },
  tobe: { beginner: [question('I ____ a student.', ['am','is','are','be'], 0, 'I takes am.', 'tb-b-1')] },
  vocabulary: { beginner: [question('I need to run a few ____.', ['chores','errands','routines','tasks'], 1, 'Run errands is the natural collocation.', 'voc-b-1')] }
};
