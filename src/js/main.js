import { PROJECTS_STORE } from "./store/cases.store";

import { ParticlesServices } from "./services/particles.service";

const consoleWin = document.querySelector('.console');
const consoleHead = document.querySelector('.console__head');
const consoleArea = document.querySelector('.console__area');
const consoleCanvas = document.querySelector('.console__canvas');
const consoleElements = document.querySelector('.console__view');
const consoleInput = document.querySelector('.console__cmd input');

const consoleBtnDestroy = document.querySelector('.console__btn');
const consoleBtnSmall = document.querySelector('.console__btn.--y');
const consoleBtnFull = document.querySelector('.console__btn.--g');

const cmdErrs = {
  errorMailValid: "enter mail valid error",
  errorMsgValid: "enter massage valid error (min length 5 symbol)",
  errorValid: "error valid",
  warnCommand: "command is undefined this console",
  sending: "email in progress...",
  sendingComplete: "email is success sending...",
};

let storeCommand = [];
let countClickUp = 0;
let consoleDragTrigger = false;

const checkElementInDom = (elm, func) => {
  if (typeof(elm) != 'undefined' && elm != null) {
    return func();
  }
};

const mouseX = (event) => {
  return event.clientX
};

const mouseY = (event) => {
  return event.clientY
};

const casesHoverEvent = () => {
  let casesPar = document.querySelectorAll('.cases__item');
  let scrollTimeout;

  let pos = 1;

  const clearScroll = (img) => {
    pos = 1;
    img.scrollTo({ top: 1, behavior: "smooth" });

    clearTimeout(scrollTimeout);
  }

  casesPar.forEach((elm) => {
    let
      link = elm.querySelector('a'),
      img = elm.querySelector('.cases__img');

    const scrollElement = () => {
      clearTimeout(scrollTimeout);

      if (img.scrollTop <= img.scrollHeight - 1) {
        pos = pos + 1.6;
        img.scrollTo(0, pos);
        scrollTimeout = setTimeout(scrollElement, 0);
      }
    }

    link.addEventListener('mouseover', (event) => {
      clearScroll(img);

      setTimeout(scrollElement, 3500);
    })

    // link.addEventListener('mouseout', () => {
    //   clearScroll(img);
    // })
  })
};

const createLink = (url, name, pic, desc, year, tags, rate) => {
  const par = document.querySelector('.cases__content');

  let item = document.createElement('div');
  item.setAttribute('class', "cases__item");

  let detail = document.createElement('article');
  detail.setAttribute('class', "cases__detail");

  let picture = document.createElement('picture');
  picture.setAttribute('class', "cases__img");

  let hours = document.createElement('hours');
  hours.setAttribute('class', "cases__hours");

  let img = document.createElement('img');
  img.setAttribute('src', 'images/cases/' + pic);
  img.setAttribute('loading', 'lazy');

  let head = document.createElement('div');
  head.setAttribute('class', "cases__head");

  let description = document.createElement('h2');
  description.setAttribute('class', "cases__desc");
  description.innerHTML = `${desc}<strong>${year}</strong>`;

  let skillss = document.createElement('div');
  skillss.setAttribute('class', "cases__tags");

  let link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('target', '_blank');
  // link.setAttribute('data-hours', '30h');
  const setRating = (rt) => {
    if (rt >= 8) {
      return '★ ★ ★ ★ ★';
    } else if (rt >= 6 && rt < 8) {
      return '★ ★ ★ ★';
    } else {
      return '★ ★ ★ ';
    }
  }

  link.setAttribute('data-rating', setRating(rate));
  link.classList.add('cases__link');
  link.innerHTML = name;

  let data = (parent) => {
    tags.forEach((element) => {
      let elm = document.createElement('mark');
      elm.setAttribute('class', "cases__tag");
      elm.innerHTML = element;
      parent.appendChild(elm);
    })
  }

  par.appendChild(item).appendChild(link);
  // par.appendChild(item)

  par.appendChild(item).appendChild(detail).appendChild(picture).appendChild(img);
  par.appendChild(item).appendChild(detail).appendChild(head).appendChild(description);
  par.appendChild(item).appendChild(detail).appendChild(head).appendChild(skillss);

  data(skillss);
};

const positionElement = (event, elm) => {
  const cursor = document.getElementById('cursor');
  const cursorSize = 30 / 2;

  const mouse = {
    x: mouseX(event),
    y: mouseY(event)
  }

  elm.style.top = (mouse.y - cursorSize) + 'px'
  elm.style.left = (mouse.x - cursorSize) + 'px'
};

const sendData = (data) => {
  const XHR = new XMLHttpRequest();

  let urlEncodedData = "",
    // urlEncodedDataPairs = [],
    mail;

  // Turn the data object into an array of URL-encoded key/value pairs.
  // for (mail in data) {
  //   urlEncodedDataPairs.push(encodeURIComponent(mail) + ':' + encodeURIComponent(data[mail]));
  //   console.log('urlEncodedDataPairs = ', urlEncodedDataPairs);
  //   console.log('mail = ', mail);
  //
  // }

  // Combine the pairs into a single string and replace all %-encoded spaces to
  // the '+' character; matches the behaviour of browser form submissions.
  // urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

  console.log('data = ', data);
  // Define what happens on successful data submission
  XHR.addEventListener('load', function(event) {
    console.log('Yeah! Data sent and response loaded.');
    setConsole('✓ ', '', cmdErrs.sendingComplete);
  });

  // Define what happens in case of error
  XHR.addEventListener('error', function(event) {
    console.log('Oops! Something went wrong.');
  });

  // Set up our request
  XHR.open('POST', '/sent.php');

  // Add the required HTTP header for form data POST requests
  XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  // Finally, send our data.
  XHR.send(data);
};

const btnToggles = () => {
  const aside = document.querySelector('.layout__asides');

  const skills = document.querySelector('.skills .skills__content');
  const cases = document.querySelector('.cases .cases__content');

  const skillsBtn = document.querySelector('.skills .caption');
  const casesBtn = document.querySelector('.cases .caption');

  const hide = '--show';
  const upPos = '--up';

  function chekAsidesPos() {
    (cases.classList.contains(hide) || skills.classList.contains(hide)) ?
    aside.classList.add(upPos): setTimeout(() => aside.classList.remove(upPos), 1200)
  };

  skillsBtn.addEventListener('click', () => {
    cases.classList.remove(hide);
    skills.classList.toggle(hide);

    chekAsidesPos();
  });

  casesBtn.addEventListener('click', () => {
    skills.classList.remove(hide);
    cases.classList.toggle(hide);

    chekAsidesPos();
  });
};

const initChangeCursor = () => {
  let delayCursor = false;
  const cursor = document.getElementById('cursor');

  // cursor.addEventListener('click', ev => ev.stopPropagation());

  window.addEventListener('mousemove', (event) => {
    const _event = event;

    delayCursor = setTimeout(() => {
      checkElementInDom(cursor, positionElement(event, cursor));
    }, 1)
  })

  window.addEventListener('click', (event) => {
    cursor.classList.add('--expand');

    setTimeout(() => {
      cursor.classList.remove('--expand')
    }, 1000);
  })

  return console.log('🚀 initial Change Cursor');
};

const setConsole = (val, status = false, msg) => {
  let prefix = '';
  let newElm = document.createElement('pre');

  if (status === 'err') {
    newElm.classList.add('--err');
  } else if (status === 'war') {
    newElm.classList.add('--war');
  }

  setTimeout(() => {
    newElm.innerHTML = prefix + val + msg;
    consoleElements.appendChild(newElm);
    consoleArea.scrollBy(0, consoleArea.scrollHeight);
  }, 10);
};

const goTo = (link) => {
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;

  let centerX, centerY, wg, hg;

  wg = screenWidth / 1.33;
  hg = screenHeight / 1.33;
  centerX = (screenWidth / 2) - (wg / 2);
  centerY = (screenHeight / 2) - (hg / 2);

  let opt = `left=${centerX},top=${centerY}, width=${wg},height=${hg}`

  window.event.preventDefault();
  window.open(link, '_blank', opt)
};

const cmd = {
  clear: () => {
    consoleElements.innerHTML = '';
  },
  last: () => {
    goTo('https://newsurrogacy.com/');
    setConsole('✓ [last]', '', ' - open last project');
  },
  top: () => {
    for (let arr of PROJECTS_STORE) {
      if (arr.rating >= 8) {
        goTo(arr.link);
      }
    }
    setConsole('✓ [top]', '', ' - open top projects');
  },
  all: () => {
    for (let arr of PROJECTS_STORE) {
      goTo(arr.link);
    }
    setConsole('✓ [all]', '', ' - open all project');
  },
  cv: () => {
    goTo('/cv.pdf');
    setConsole('✓ [cv]', '', ' - open curriculum vitae');
  },
  code: () => {
    goTo('https://codepen.io/IllyaDeveloper/pen/poWVZLX');
    setConsole('✓ [code]', '', ' - my code examples are open');
  },
  crf: () => {
    goTo('https://gb.ru/certificates/1289101.en');
    setConsole('✓ [code]', '', ' - my certificates are open');
  },
  // cv:() => {},
  sent: (val) => {
    let ms = val.slice(4);
    let email = [];
    let emailRegex = /(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
    let match;

    while (match = emailRegex.exec(ms)) {
      email.push(match[0]);
      ms = ms.replace(match[0], "").trim();
    }

    if (validateEmail(email) && ((ms !== '') && (ms.length >= 5))) {
      sendData({ email: email[0], message: ms });
      setConsole('&#9737; [' + email + '] [' + ms + '] ', '', cmdErrs.sending);

      setTimeout(() => {}, 300)
      return
    }
    if (!validateEmail(email)) {
      return setConsole('✖ [' + (email === '') ? '' : email + '] ', 'err', cmdErrs.errorMailValid);
    }

    if ((ms === '') || (ms.length <= 5)) {
      return setConsole('✖ [' + (ms === '') ? '' : ms + '] ', 'err', cmdErrs.errorMsgValid);
    }
  },
  help: () => {
    let html =
      'Welcome my friend 👋 is my simple console, you can perform:\n' +
      '<pre>$ <b>last</b> - see my last completed project</pre>\n' +
      '<pre>$ <b>top</b> - see the most worthy cases</pre>\n' +
      '<pre>$ <b>all</b> - see all my successful cases</pre>\n' +
      '<pre>$ <b>cv</b> - see my cv</pre>\n' +
      '<pre>$ <b>code</b> - see my code examples</pre>\n' +
      '<pre>$ <b>crf</b> - see my certificates</pre>\n' +
      '<pre>$ <b>sent your@email "your message"</b> - send me a message</pre>\n' +
      '<pre>$ <b>clear</b> - clear console</pre>\n' +
      '<pre>$ <b>help</b> - info commands</pre>';

    consoleElements.innerHTML = '';
    consoleElements.innerHTML = html;
  }
};

const setStoreCommand = (val) => {
  if (storeCommand.length > 20) {
    storeCommand.length = 0;
  }

  storeCommand.unshift(val);
  return storeCommand
};

const getStoreCommand = () => {
  if (storeCommand.length === -1) {
    return
  } else if (countClickUp >= storeCommand.length) {
    countClickUp = 0;
  }

  consoleInput.value = '';
  consoleInput.value = storeCommand[countClickUp];
  countClickUp = countClickUp + 1;
};

const validateEmail = (email) => {
  return String(email).toLowerCase().match(MAIL_REGULAR);
};

const closeDragElement = () => {
  document.onmouseup = null;
  document.onmousemove = null;
};

const consoleDrag = (elm) => {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;

  if (consoleHead) {
    consoleHead.onmousedown = dragMouseDown;
  } else {
    elm.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;

    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;

    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    let spacer = 20;

    if (consoleDragTrigger) {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      elm.style.top = (elm.offsetTop - pos2) + "px";
      elm.style.left = (elm.offsetLeft - pos1) + "px";

      if (
        (elm.offsetTop - pos2) >= spacer && (elm.offsetLeft - pos1) >= spacer &&
        ((elm.offsetTop + elm.clientHeight)) <= (window.innerWidth - spacer) &&
        ((elm.offsetLeft + elm.clientWidth)) <= (window.innerHeight - spacer)
      ) {

      }
    }
  }
};

const consoleFixedPosition = () => {
  let state = () => {
    consoleDragTrigger = false;
    closeDragElement();
  }

  (consoleWin.classList.contains('--full') || consoleWin.classList.contains('--small')) ?
  state(): consoleDragTrigger = true
};

const consoleAnimationInit = () => {
  const consoleCanvas = document.querySelector('.console__canvas');
  const CONFIG_TRIANGLE = {
    lines: 200,
    color: '#ffffff'
  };

  let w, h;

  let drawLines = (p5) => {
    let color = CONFIG_TRIANGLE.color;
    let count = CONFIG_TRIANGLE.lines;

    p5.setup = () => {
      w = consoleCanvas.clientWidth;
      h = consoleCanvas.clientHeight;


      p5.createCanvas(w, h);
    };

    p5.windowResized = () => {
      w = consoleCanvas.clientWidth;
      h = consoleCanvas.clientHeight;

      p5.resizeCanvas(w, h);
    }

    let t1 = 0,
      t2 = 0,
      t3 = 0,
      t4 = 0,
      t5 = 0,
      t6 = 0;
    let
      dt1 = p5.random(0.01, 0.001),
      dt2 = p5.random(0.02, 0.002),
      dt3 = p5.random(0.03, 0.003),
      dt4 = p5.random(0.04, 0.004);
    // dt5 = p5.random(0.05, 0.005);
    // dt6 = p5.random(0.06, 0.006);

    let
      rnd = p5.random(10, 800),
      wR = p5.random(0.05, 0.005) + (w / 2),
      hR = p5.random(0.05, 0.005) + (h / 2);

    p5.draw = () => {
      p5.clear();
      p5.noFill();
      p5.stroke(color);

      for (let i = 1; i < count; i++) {
        p5.triangle(
          // wrnd,
          // hrnd,
          p5.abs(p5.sin(t1 + i * rnd)) * w,
          p5.abs(p5.cos(t2 + i * rnd)) * h,
          p5.abs(p5.sin(t3 + i * rnd)) * w,
          p5.abs(p5.cos(t4 + i * rnd)) * h,
          p5.abs(p5.cos(t5 + i * rnd)) * h,
          p5.abs(p5.cos(t6 + i * rnd)) * h,
        );
      }
      t1 += dt1;
      t2 += dt2;
      t3 += dt3;
      t4 += dt4;
      t5 += wR;
      t6 += hR;
    }
  }

  let lineAnimationInit = new p5(drawLines, consoleCanvas);
  // return lineAnimationInit();
}

const initConsole = () => {
  if (window.innerWidth <= 960) {
    return
  }

  cmd.help();

  setTimeout(() => {
    consoleWin.classList.remove('--hide');
    consoleFixedPosition();
  }, 1300);

  consoleInput.addEventListener('keydown', (event) => {
    let val = consoleInput.value;

    if (event.key === 'Enter') {
      if ((val != null) || (val !== '')) {
        if (val === 'clear') cmd.clear()
        else if (val === 'help') cmd.help()
        else if (val === 'cv') cmd.cv()
        else if (val === 'last') cmd.last()
        else if (val === 'top') cmd.top()
        else if (val === 'all') cmd.all()
        else if (val === 'code') cmd.code()
        else if (val === 'crf') cmd.crf()
        else if (val.slice(0, 4) === 'sent') cmd.sent(val)
        else setConsole('&#9888; [' + val + '] ', 'war', cmdErrs.warnCommand);
      }
      setStoreCommand(val);

      return consoleInput.value = '';
    }

    if (event.key === 'ArrowUp') {
      getStoreCommand()
    }
  })

  consoleBtnDestroy.addEventListener('click', () => {
    setTimeout(() => {
      consoleWin.remove();
    }, 1300);
  });

  consoleBtnFull.addEventListener('click', () => {
    consoleWin.classList.remove('--small');
    consoleWin.classList.toggle('--full');

    consoleFixedPosition();
  });

  consoleBtnSmall.addEventListener('click', () => {
    consoleWin.classList.toggle('--small')

    consoleFixedPosition();
  });

  consoleArea.addEventListener('click', (event) => {
    event.preventDefault();
    consoleInput.focus()
  });

  consoleDrag(consoleWin);

  consoleAnimationInit()

  return console.log('🚀 initial Console');
};

const appendCasesLinks = () => {
  for (let caseItem of PROJECTS_STORE) {
    createLink(caseItem.link, caseItem.name, caseItem.img, caseItem.desc, caseItem.year, caseItem.tags, caseItem.rating);
  }

  casesHoverEvent();
};

const resetScroll = () => {
  setTimeout(() => {
    window.scrollTo(0, 0);
    clearTimeout();
  }, 0);
}

const updateYearOnElement = (element) => {
  document.querySelector(element).innerHTML = new Date().getFullYear();
};

window.addEventListener('DOMContentLoaded', (revent) => {
  // new ParticlesServices().init();

  btnToggles();
  appendCasesLinks();
  // initChangeCursor();
  initConsole();

  updateYearOnElement('[data-actual-year]');
});
