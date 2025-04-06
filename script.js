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