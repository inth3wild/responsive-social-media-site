//============================ SIDEBAR =============== 
setActiveSidebar();

function setActiveSidebar() {
    let sideBarItems = document.querySelectorAll('.sidebar-item');

    // Remove active class from all sidebar items
    const removeAllActiveClass = () => {
        sideBarItems.forEach(item => {
            item.classList.remove('active');
        }) 
    }

    const displayNotificationsPopup = (item) => {
        if (item.id != 'notifications') {
            document.querySelector('.notification-popup').style.display = 'none';
        } else {
            document.querySelector('.notification-popup').style.display = 'block';
            hideAlertCounter(item);
        }
    }

    const hideAlertCounter = () => {
        document.querySelector('#notifications small').style.display = 'none';
        console.log( document.querySelector('#notifications small') );  
    }
    
    // Set active class on specific sidebar item
    sideBarItems.forEach(item => {
        item.addEventListener('click', (e) => {
            removeAllActiveClass();
            item.classList.add('active')

            // Choose whether to display notifications popup
            displayNotificationsPopup(item);
        })
    });
}



// ===================== MESSAGES =======================
const messages = {
    messagesSidebarElement: document.querySelector('#messages-notifications'),
    messagesCardElement: document.querySelector('.messages'),
    allMessagesElement: document.querySelectorAll('.message'),
    messagesSearchBarElement: document.querySelector('#message-search'),

    hideAlertCounter: () => {
        document.querySelector('#messages-notifications small').style.display = 'none';
    }
}

function handleMessages(messages) {
    messages.messagesSidebarElement.addEventListener('click', () => {
        // Remove messages alert counter
        messages.hideAlertCounter();

        // Give messages element boxShadow for 2 seconds
        messages.messagesCardElement.style.boxShadow = '0 0 1rem var(--color-primary)';
        messages.messagesCardElement.style.transition = 'all 500ms ease-out';
        setTimeout(() => {
            messages.messagesCardElement.style.boxShadow = 'none';
        }, 2000);

    })
}
handleMessages(messages);




// =================== SEARCH BAR ============================
const searchBar = {
    // Display messages corresponding to searchbar value
    searchMessage: (searchValue) => {
        messages.allMessagesElement.forEach(message => {
            let username = message.querySelector('h5').textContent.toLowerCase();

            if ( username.indexOf(searchValue.toLowerCase()) != -1 ) {
                message.style.display = 'flex';
            }
            else {
                message.style.display = 'none';
            }
        });

    }
}

function handleSearchBar(searchBar, messages) {

    messages.messagesSearchBarElement.addEventListener('keyup',  () => {
        searchBar.searchMessage(messages.messagesSearchBarElement.value);
    });
}
handleSearchBar(searchBar, messages);





// ======================= THEME CUSTOMIZATION ====================
const themeModal = {
    themePaletteElement: document.querySelectorAll('.sidebar-item')[6],
    themeModalElement: document.querySelector('#theme-modal'),
    fontSizePicker: document.querySelector('.font-size-picker'),
    colorPicker: document.querySelector('.color-picker'),
    backgroundPicker: document.querySelector('.background-picker'),

    displayThemeModal: (themeModalElement) => {
        themeModalElement.style.display = 'grid';
    },

    closeThemeModal: (themeModalElement, e) => {
        if (e.target.classList.contains('customize-theme-modal')) {
            themeModalElement.style.display = 'none';
        } else {
            themeModalElement.style.display = 'grid';
        }
    },

    setFontSize: (element) => {
        let bodyElement = document.querySelector('html');
        
        switch ( element.classList.value ) {
            case 'font-size-1':
                bodyElement.style.fontSize = '10px';
                break;
            case 'font-size-2':
                bodyElement.style.fontSize = '13px'
                break;
            case 'font-size-3':
                bodyElement.style.fontSize = '16px'
                break;
            case 'font-size-4':
                bodyElement.style.fontSize = '19px'
                break;
            case 'font-size-5':
                bodyElement.style.fontSize = '22px'
                break;
            default:
                break;
        }
    },

    setColor: (element) => {
        let root = document.querySelector(':root');

        switch ( element.classList.value ) {
            case 'color-1':
                root.style.setProperty('--primary-color-hue', '252');
                break;
            case 'color-2':
                root.style.setProperty('--primary-color-hue', '52');
                break;
            case 'color-3':
                root.style.setProperty('--primary-color-hue', '352');
                break;
            case 'color-4':
                root.style.setProperty('--primary-color-hue', '152');
                break;
            case 'color-5':
                root.style.setProperty('--primary-color-hue', '202');
                break;
            default:
                break;
        }
    },

    setBackgroundColor: (element) => {
        let bodyElement = document.querySelector('body');
        let rootElement = document.querySelector(':root');

        switch ( element.classList.value ) {
            case 'light-bg active':
                rootElement.style.setProperty('--dark-color-lightness', '');
                rootElement.style.setProperty('--light-color-lightness', '');
                rootElement.style.setProperty('--white-color-lightness', '');
                break;
            case 'dim-bg active':
                rootElement.style.setProperty('--dark-color-lightness', '95%');
                rootElement.style.setProperty('--light-color-lightness', '20%');
                rootElement.style.setProperty('--white-color-lightness', '15%');
                break;
            case 'lights-out-bg active':
                rootElement.style.setProperty('--dark-color-lightness', '95%');
                rootElement.style.setProperty('--light-color-lightness', '0%');
                rootElement.style.setProperty('--white-color-lightness', '10%');
                break;
            default:
                break;
        }
    },

    removeActiveFontSizeClass: (elements) => {
        elements.forEach(element => {
            element.style.background = '';
        });
    },
    removeActiveColorButtons: (elements) => {
        elements.forEach(element => {
            element.style.border = '';
            element.classList.remove('active');
        });
    },
    removeActiveBackgroundColorButtons: (elements) => {
        elements.forEach(element => {
            element.classList.remove('active');
        });
    }

}
function handleThemeModal(themeModal) {
    let fontSizes = themeModal.fontSizePicker.querySelectorAll('span');
    let colorButtons = themeModal.colorPicker.querySelectorAll('span');
    let BackgroundColorButtons = themeModal.backgroundPicker.querySelectorAll('.color-buttons div');

    // Display theme Modal
    themeModal.themePaletteElement.addEventListener('click', () => {
        themeModal.displayThemeModal(themeModal.themeModalElement);
    })

    // Close Theme Modal
    themeModal.themeModalElement.addEventListener('click', (e) => {
        themeModal.closeThemeModal(themeModal.themeModalElement, e);
    })

    // Change Font sizes
    fontSizes.forEach(element => {
        element.addEventListener('click', () => {
            themeModal.removeActiveFontSizeClass(fontSizes);
            element.style.background = 'var(--color-primary)';
            themeModal.setFontSize(element);
        })
    });
    
    // Change colors
    colorButtons.forEach(button => {
        button.addEventListener('click', () => {
            themeModal.removeActiveColorButtons(colorButtons);
            button.style.border = '3px solid var(--color-white)';
            themeModal.setColor(button);
        })
    });

    // Change Background Colors
    BackgroundColorButtons.forEach(button => {
    button.addEventListener('click', () => {
        themeModal.removeActiveBackgroundColorButtons(BackgroundColorButtons);
        button.classList.toggle('active');
        themeModal.setBackgroundColor(button);
    })
});
}
   

handleThemeModal(themeModal);