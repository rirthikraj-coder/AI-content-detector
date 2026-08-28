/* =========================================================
   AI OR HUMAN DETECTOR
   Client-side text analysis
========================================================= */


/* =========================================================
   AI-STYLE PHRASES

   These are NOT proof of AI writing.
   They are only weak linguistic signals.
========================================================= */

const AI_PHRASES = [

    "in conclusion",

    "it is important to note",

    "it is worth noting",

    "delve into",

    "comprehensive",

    "furthermore",

    "moreover",

    "in today's world",

    "plays a crucial role",

    "plays an important role",

    "this article aims to",

    "in summary",

    "overall",

    "let us explore",

    "a testament to",

    "seamless integration",

    "in the modern world",

    "in the rapidly evolving",

    "it can be seen that",

    "it is essential to understand",

    "one of the key factors",

    "another important aspect",

    "in other words"

];


/* =========================================================
   DOM ELEMENTS
========================================================= */

const textInput =
    document.getElementById("textInput");

const wordCount =
    document.getElementById("wordCount");

const characterCount =
    document.getElementById("characterCount");

const analyzeButton =
    document.getElementById("analyzeButton");

const clearButton =
    document.getElementById("clearButton");

const resultSection =
    document.getElementById("resultSection");

const loading =
    document.getElementById("loading");

const errorBox =
    document.getElementById("errorBox");


/* =========================================================
   WORD COUNTER
========================================================= */

function countWords(text) {

    if (!text.trim()) {

        return 0;
    }

    /*
       Unicode-aware word matching.

       This works much better than simply using:
       text.split(" ")
    */

    const matches =
        text.match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu);

    return matches ? matches.length : 0;
}


/* =========================================================
   SENTENCE EXTRACTION
========================================================= */

function getSentences(text) {

    return text
        .split(/[.!?]+/)
        .map(sentence => sentence.trim())
        .filter(sentence => sentence.length > 0);
}


/* =========================================================
   WORD TOKENIZATION
========================================================= */

function tokenize(text) {

    const matches =
        text
            .toLowerCase()
            .match(
                /[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu
            );

    return matches || [];
}


/* =========================================================
   UPDATE COUNTERS
========================================================= */

function updateCounters() {

    const text = textInput.value;

    const words = countWords(text);

    const characters = text.length;

    wordCount.textContent =
        words.toLocaleString();

    characterCount.textContent =
        characters.toLocaleString();
}


textInput.addEventListener(
    "input",
    updateCounters
);


/* =========================================================
   CALCULATE SENTENCE LENGTH
========================================================= */

function sentenceLengths(sentences) {

    return sentences.map(sentence => {

        return countWords(sentence);

    });
}


/* =========================================================
   CALCULATE AVERAGE
========================================================= */

function average(numbers) {

    if (numbers.length === 0) {

        return 0;
    }

    return numbers.reduce(
        (sum, value) => sum + value,
        0
    ) / numbers.length;
}


/* =========================================================
   STANDARD DEVIATION
========================================================= */

function standardDeviation(numbers) {

    if (numbers.length === 0) {

        return 0;
    }

    const avg =
        average(numbers);

    const variance =
        average(
            numbers.map(
                number =>
                    Math.pow(number - avg, 2)
            )
        );

    return Math.sqrt(variance);
}


/* =========================================================
   VOCABULARY DIVERSITY
========================================================= */

function vocabularyRatio(tokens) {

    if (tokens.length === 0) {

        return 0;
    }

    const unique =
        new Set(tokens);

    return unique.size / tokens.length;
}


/* =========================================================
   WORD REPETITION
========================================================= */

function repetitionRatio(tokens) {

    if (tokens.length === 0) {

        return 0;
    }

    const frequencies =
        new Map();


    for (const word of tokens) {

        frequencies.set(
            word,
            (frequencies.get(word) || 0) + 1
        );
    }


    let repeatedWords = 0;


    for (const frequency of frequencies.values()) {

        if (frequency > 1) {

            repeatedWords += frequency - 1;
        }
    }


    return repeatedWords / tokens.length;
}


/* =========================================================
   AI PHRASE DETECTION
========================================================= */

function findAIPhrases(text) {

    const lowerText =
        text.toLowerCase();

    let hits = 0;

    const found = [];


    for (const phrase of AI_PHRASES) {

        let position = 0;

        let phraseCount = 0;


        while (true) {

            const index =
                lowerText.indexOf(
                    phrase,
                    position
                );


            if (index === -1) {

                break;
            }


            phraseCount++;

            position =
                index + phrase.length;
        }


        if (phraseCount > 0) {

            hits += phraseCount;

            found.push({
                phrase: phrase,
                count: phraseCount
            });
        }
    }


    return {
        hits: hits,
        found: found
    };
}


/* =========================================================
   FIRST-PERSON WORDS
========================================================= */

function firstPersonCount(text) {

    const matches =
        text
            .toLowerCase()
            .match(
                /\b(i|i'm|i’ve|i'd|my|me|we|our|us)\b/g
            );

    return matches
        ? matches.length
        : 0;
}


/* =========================================================
   CONTRACTION COUNT
========================================================= */

function contractionCount(text) {

    const matches =
        text.match(
            /\b[\p{L}]+(?:['’][\p{L}]+)\b/gu
        );

    return matches
        ? matches.length
        : 0;
}


/* =========================================================
   PUNCTUATION
========================================================= */

function punctuationCount(text) {

    const matches =
        text.match(
            /[,;:—–-]/g
        );

    return matches
        ? matches.length
        : 0;
}


/* =========================================================
   PARAGRAPH COUNT
========================================================= */

function paragraphCount(text) {

    return text
        .split(/\n\s*\n/)
        .filter(
            paragraph =>
                paragraph.trim().length > 0
        ).length;
}


/* =========================================================
   MAIN FEATURE EXTRACTION
========================================================= */

function extractFeatures(text) {

    const tokens =
        tokenize(text);

    const sentences =
        getSentences(text);

    const lengths =
        sentenceLengths(sentences);

    const avgSentenceLength =
        average(lengths);

    const deviation =
        standardDeviation(lengths);

    /*
       Burstiness represents variation in sentence lengths.

       Higher variation can be associated with
       more natural writing, but this is NOT a proof.
    */

    const burstiness =
        avgSentenceLength > 0
            ? deviation / avgSentenceLength
            : 0;


    const vocabulary =
        vocabularyRatio(tokens);


    const repetition =
        repetitionRatio(tokens);


    const aiPhrases =
        findAIPhrases(text);


    const firstPerson =
        firstPersonCount(text);


    const contractions =
        contractionCount(text);


    const punctuation =
        punctuationCount(text);


    return {

        wordCount:
            tokens.length,

        characterCount:
            text.length,

        sentenceCount:
            sentences.length,

        paragraphCount:
            paragraphCount(text),

        averageSentenceLength:
            avgSentenceLength,

        burstiness:
            burstiness,

        vocabularyRatio:
            vocabulary,

        repetitionRatio:
            repetition,

        aiPhraseHits:
            aiPhrases.hits,

        firstPersonCount:
            firstPerson,

        contractionCount:
            contractions,

        punctuationCount:
            punctuation
    };
}


/* =========================================================
   DETECTION ALGORITHM
========================================================= */

function detectText(text) {

    const features =
        extractFeatures(text);


    let score = 50;


    /* -----------------------------------------
       SENTENCE VARIATION
    ----------------------------------------- */

    if (
        features.burstiness < 0.35
    ) {

        score += 12;

    }

    else if (
        features.burstiness > 0.85
    ) {

        score -= 10;
    }


    /* -----------------------------------------
       VOCABULARY
    ----------------------------------------- */

    if (
        features.vocabularyRatio > 0.72
    ) {

        score += 5;

    }

    else if (
        features.vocabularyRatio < 0.50
    ) {

        score -= 4;
    }


    /* -----------------------------------------
       AI PHRASES
    ----------------------------------------- */

    score += Math.min(
        features.aiPhraseHits * 2.5,
        15
    );


    /* -----------------------------------------
       REPETITION
    ----------------------------------------- */

    score += Math.min(
        features.repetitionRatio * 20,
        8
    );


    /* -----------------------------------------
       FIRST PERSON
    ----------------------------------------- */

    const firstPersonRatio =
        features.wordCount > 0
            ? features.firstPersonCount /
              features.wordCount
            : 0;


    score -= Math.min(
        firstPersonRatio * 80,
        10
    );


    /* -----------------------------------------
       CONTRACTIONS
    ----------------------------------------- */

    const contractionRatio =
        features.wordCount > 0
            ? features.contractionCount /
              features.wordCount
            : 0;


    score -= Math.min(
        contractionRatio * 100,
        8
    );


    /* -----------------------------------------
       LIMIT SCORE
    ----------------------------------------- */

    score =
        Math.max(
            1,
            Math.min(
                99,
                Math.round(score)
            )
        );


    /* -----------------------------------------
       RESULT LABEL
    ----------------------------------------- */

    let label;

    let confidence;


    if (score >= 65) {

        label =
            "Likely AI-assisted";

        confidence =
            score;
    }

    else if (score <= 35) {

        label =
            "Likely human-written";

        confidence =
            100 - score;
    }

    else {

        label =
            "Uncertain / mixed";

        confidence =
            50 + Math.abs(score - 50);
    }


    return {

        aiProbability:
            score,

        humanProbability:
            100 - score,

        label:
            label,

        confidence:
            Math.round(confidence),

        features:
            features
    };
}


/* =========================================================
   FORMAT LARGE NUMBERS
========================================================= */

function formatNumber(number) {

    return number.toLocaleString();
}


/* =========================================================
   DISPLAY STATISTICS
========================================================= */

function displayStatistics(features) {

    const statistics =
        document.getElementById(
            "statistics"
        );


    const stats = [

        [
            "Words",
            formatNumber(
                features.wordCount
            )
        ],

        [
            "Characters",
            formatNumber(
                features.characterCount
            )
        ],

        [
            "Sentences",
            formatNumber(
                features.sentenceCount
            )
        ],

        [
            "Paragraphs",
            formatNumber(
                features.paragraphCount
            )
        ],

        [
            "Avg. sentence length",
            features.averageSentenceLength.toFixed(2)
        ],

        [
            "Sentence variation",
            features.burstiness.toFixed(3)
        ],

        [
            "Vocabulary ratio",
            features.vocabularyRatio.toFixed(3)
        ],

        [
            "Repeated-word ratio",
            features.repetitionRatio.toFixed(3)
        ],

        [
            "AI-style phrase hits",
            formatNumber(
                features.aiPhraseHits
            )
        ],

        [
            "Personal-word count",
            formatNumber(
                features.firstPersonCount
            )
        ]

    ];


    statistics.innerHTML = "";


    for (const [label, value] of stats) {

        const div =
            document.createElement(
                "div"
            );

        div.className =
            "stat";


        div.innerHTML = `

            <span class="stat-label">
                ${label}
            </span>

            <span class="stat-value">
                ${value}
            </span>

        `;


        statistics.appendChild(div);
    }
}


/* =========================================================
   DISPLAY RESULT
========================================================= */

function displayResult(result) {

    const score =
        result.aiProbability;


    const human =
        result.humanProbability;


    /* -----------------------------------------
       SCORE
    ----------------------------------------- */

    document.getElementById(
        "aiScore"
    ).textContent =
        `${score}%`;


    /* -----------------------------------------
       RESULT LABEL
    ----------------------------------------- */

    document.getElementById(
        "resultTitle"
    ).textContent =
        result.label;


    document.getElementById(
        "confidenceText"
    ).textContent =
        `Confidence: ${result.confidence}%`;


    /* -----------------------------------------
       PROGRESS BARS
    ----------------------------------------- */

    document.getElementById(
        "aiPercentage"
    ).textContent =
        `${score}%`;


    document.getElementById(
        "humanPercentage"
    ).textContent =
        `${human}%`;


    document.getElementById(
        "aiProgress"
    ).style.width =
        `${score}%`;


    document.getElementById(
        "humanProgress"
    ).style.width =
        `${human}%`;


    /* -----------------------------------------
       SCORE CIRCLE
    ----------------------------------------- */

    const degrees =
        score * 3.6;


    document.getElementById(
        "scoreCircle"
    ).style.background = `

        conic-gradient(

            #7182ff
            ${degrees}deg,

            #293451
            ${degrees}deg

        )

    `;


    /* -----------------------------------------
       STATISTICS
    ----------------------------------------- */

    displayStatistics(
        result.features
    );


    /* -----------------------------------------
       SHOW RESULT
    ----------------------------------------- */

    resultSection.classList.remove(
        "hidden"
    );
}


/* =========================================================
   ANALYZE BUTTON
========================================================= */

analyzeButton.addEventListener(
    "click",
    function () {

        const text =
            textInput.value.trim();


        /* -------------------------------------
           EMPTY CHECK
        ------------------------------------- */

        if (!text) {

            showError(
                "Please enter some text."
            );

            return;
        }


        /* -------------------------------------
           MINIMUM TEXT CHECK
        ------------------------------------- */

        const words =
            countWords(text);


        if (words < 20) {

            showError(
                "Please enter at least 20 words for a more meaningful estimate."
            );

            return;
        }


        /* -------------------------------------
           HIDE OLD RESULT
        ------------------------------------- */

        errorBox.classList.add(
            "hidden"
        );


        resultSection.classList.add(
            "hidden"
        );


        /* -------------------------------------
           SHOW LOADING
        ------------------------------------- */

        loading.classList.remove(
            "hidden"
        );


        /*
           setTimeout prevents the browser UI
           from appearing frozen while the analysis
           begins.

           The actual analysis happens locally.
        */

        setTimeout(
            function () {

                try {

                    const result =
                        detectText(text);


                    displayResult(
                        result
                    );

                }

                catch (error) {

                    console.error(
                        error
                    );


                    showError(
                        "Something went wrong while analyzing the text."
                    );
                }


                finally {

                    loading.classList.add(
                        "hidden"
                    );
                }

            },
            50
        );

    }
);


/* =========================================================
   CLEAR BUTTON
========================================================= */

clearButton.addEventListener(
    "click",
    function () {

        textInput.value = "";

        updateCounters();

        resultSection.classList.add(
            "hidden"
        );

        errorBox.classList.add(
            "hidden"
        );
    }
);


/* =========================================================
   ERROR FUNCTION
========================================================= */

function showError(message) {

    errorBox.textContent =
        message;


    errorBox.classList.remove(
        "hidden"
    );


    resultSection.classList.add(
        "hidden"
    );
}


/* =========================================================
   INITIALIZE
========================================================= */

updateCounters();
