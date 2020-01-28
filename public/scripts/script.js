window.onload = () => {
    const navBtns = document.querySelectorAll('.nav-btn');
    const panelBtns = document.querySelectorAll('.panel-btn');
    const panels = document.querySelectorAll('.panel');

    const scrollToPanel = event => {
        const panelName = event.target.dataset.panel;
        const panel = document.querySelector(`.${panelName}`);
    
        panel.scrollIntoView({ behavior: 'smooth' });
    }
    
    const isInViewport = panel => {
        const boundingRect = panel.getBoundingClientRect();
        const halfPanelHeight = boundingRect.height / 2;
        
        return (boundingRect.top >= -halfPanelHeight) && (boundingRect.top <= halfPanelHeight);
    }
    
    const updateNav = () => {
        panels.forEach(panel => {
            if (isInViewport(panel)) {
                const panelName = panel.dataset.panel;
                navBtns.forEach(btn => {
                    if (btn.dataset.panel === panelName) {
                        btn.className = `nav-btn panel-btn active`;
                    } else {
                        btn.className = `nav-btn panel-btn ${panelName}`;
                    }
                });
                return;
            }
        })
    }

    const handleFirstTab = event => {
        if (event.keyCode === 9) {
          document.body.classList.add('tabbing');
          
          window.removeEventListener('keydown', handleFirstTab);
          window.addEventListener('mousedown', handleMouseDownOnce);
        }
    }
      
    const handleMouseDownOnce = () => {
        document.body.classList.remove('tabbing');
        
        window.removeEventListener('mousedown', handleMouseDownOnce);
        window.addEventListener('keydown', handleFirstTab);
    }
    window.addEventListener('keydown', handleFirstTab);

    
    panelBtns.forEach(btn => {
        btn.addEventListener('click', scrollToPanel)
    });

    window.onscroll = updateNav;

    updateNav();
    var rellax = new Rellax('.rellax', {
        speed: -2,
        center: false,
        wrapper: null,
        round: true,
        vertical: true,
        horizontal: false
      });
}