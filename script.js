function logEvent(eventType, element) {
    const timestamp = new Date().toISOString();
    let eventDetails = {
        timestamp: timestamp,
        eventType: eventType,
        elementType: element.tagName.toLowerCase(),
        elementId: element.id || '',
        elementClasses: element.className || '',
        elementAlt: element.alt || '',
        elementHref: element.href || (element.closest('a') ? element.closest('a').href : '')
    };

    const logDetails = [
        eventDetails.timestamp && `Timestamp: ${eventDetails.timestamp}`,
        eventDetails.eventType && `Event: ${eventDetails.eventType}`,
        eventDetails.elementType && `Element: ${eventDetails.elementType}`,
        eventDetails.elementId && `ID: ${eventDetails.elementId}`,
        eventDetails.elementClasses && `Classes: ${eventDetails.elementClasses}`,
        eventDetails.elementAlt && `Alt: ${eventDetails.elementAlt}`,
        eventDetails.elementHref && `Href: ${eventDetails.elementHref}`
      ].filter(Boolean).join(' | ');
      
      console.log(logDetails);
}

function trackPageView() {
    if (document.body) {
        logEvent('view', document.body);
    }
}

document.addEventListener('DOMContentLoaded', trackPageView);

document.addEventListener('click', (event) => {
    logEvent('click', event.target);
});

function trackVisibility() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                logEvent('view', entry.target);
            }
        });
    }, {
        threshold: 0.5 
    });

    const sections = document.querySelectorAll('div');
    sections.forEach(section => {
        observer.observe(section);
    });
}

document.addEventListener('DOMContentLoaded', trackVisibility);

function getTextStatistics(text) {
    const letters = text.replace(/[^a-zA-Z]/g, '').length;
    const words = text.trim().split(/\s+/).length;
    const spaces = (text.match(/\s/g) || []).length;
    const newlines = (text.match(/\n/g) || []).length;
    const specialSymbols = text.replace(/[a-zA-Z0-9\s\n]/g, '').length;

    return { letters, words, spaces, newlines, specialSymbols };
}

function getPronounsCount(text) {
    const pronouns = {
        personal: ['i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him', 'her', 'us', 'them'],
        possessive: ['my', 'your', 'his', 'her', 'its', 'our', 'their', 'mine', 'yours', 'hers', 'ours', 'theirs'],
        reflexive: ['myself', 'yourself', 'himself', 'herself', 'itself', 'ourselves', 'themselves', 'ourself']
    };
    const words = text.toLowerCase().split(/\s+/);
    const count = {
        personal: {},
        possessive: {},
        reflexive: {}
    };

    Object.keys(pronouns).forEach(type => {
        pronouns[type].forEach(pronoun => {
            const pronounCount = words.filter(word => word === pronoun).length;
            if (pronounCount > 0) {
                count[type][pronoun] = pronounCount;
            }
        });
    });

    return count;
}

function getPrepositionsCount(text) {
    const prepositions = ['about', 'despite', 'above', 'down', 'past', 'across', 'around', 'after', 'except', 'since', 'against', 'for', 'than', 'along', 'from' ,  'among', 'in', 'on', 'at', 'around', 'inside', 'toward', 'as', 'into', 'like', 'underneath', 'before', 'near', 'by', 'with', 'under', 'over', 'between', 'through', 'during', 'behind', 'of', 'until', 'below', 'off', 'up', 'beneath', 'upon', 'beside', 'via', 'between', 'with', 'beyond', 'by', 'outside'];
    const words = text.toLowerCase().split(/\s+/);
    const count = {};

    prepositions.forEach(preposition => {
        const prepositionCount = words.filter(word => word === preposition).length;
        if (prepositionCount > 0) {
            count[preposition] = prepositionCount;
        }
    });

    return count;
}

function getIndefiniteArticlesCount(text) {
    const articles = ['a', 'an'];
    const words = text.toLowerCase().split(/\s+/);
    const count = {};

    articles.forEach(article => {
        const articleCount = words.filter(word => word === article).length;
        if (articleCount > 0) {
            count[article] = articleCount;
        }
    });

    return count;
}

function formatCount(count) {
    return Object.keys(count).map(key => `${key}: ${count[key]}`).join('<br>');
}

function formatPronounsCount(count) {
    return `
        <b>Personal Pronouns:</b><br>${formatCount(count.personal)}<br>
        <b>Possessive Pronouns:</b><br>${formatCount(count.possessive)}<br>
        <b>Reflexive Pronouns:</b><br>${formatCount(count.reflexive)}<br>
    `;
}

function performAnalysis() {
    const text = document.getElementById("textInput").value;
    if (text.trim() === "") {
        alert("Please enter some text!");
        return;
    }

    const stats = getTextStatistics(text);
    document.getElementById("textStats").innerHTML = `
        <b>Letters:</b> ${stats.letters}<br>
        <b>Words:</b> ${stats.words}<br>
        <b>Spaces:</b> ${stats.spaces}<br>
        <b>Newlines:</b> ${stats.newlines}<br>
        <b>Special Symbols:</b> ${stats.specialSymbols}
    `;
    
    const pronounsCount = getPronounsCount(text);
    document.getElementById("pronounsCount").innerHTML = formatPronounsCount(pronounsCount);

    const prepositionsCount = getPrepositionsCount(text);
    document.getElementById("prepositionsCount").innerHTML = formatCount(prepositionsCount);

    const articlesCount = getIndefiniteArticlesCount(text);
    document.getElementById("articlesCount").innerHTML = formatCount(articlesCount);
}
