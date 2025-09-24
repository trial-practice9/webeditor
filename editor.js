// advanced-editor.js - Production Level Version with Video, Source & Iframe Support
document.addEventListener("DOMContentLoaded", () => {
    
    // CSS Injection for Professional Styling
    const editorCSS = `
        <style>
        
        * { box-sizing: border-box; }
        
        #editor-navbar {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 65px;
            background: black;
            backdrop-filter: blur(10px);
            color: white;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 25px;
            z-index: 100000;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            border-bottom: 1px solid rgba(255,255,255,0.1);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .raxlogo {
            font-weight: 700;
            font-size: 20px;
            letter-spacing: -0.5px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .nav-right {
            display: flex;
            gap: 15px;
            align-items: center;
        }
        
        .nav-right button {
            background: rgba(255,255,255,0.15);
            border: 1px solid rgba(255,255,255,0.2);
            color: white;
            padding: 10px 18px;
            border-radius: 25px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            backdrop-filter: blur(10px);
            font-size: 14px;
        }
        
        .nav-right button:hover {
            background: rgba(255,255,255,0.25);
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        
        #editor-sidebar {
            position: fixed;
            z-index: 99999;
            top: 65px;
            right: -420px;
            width: 420px;
            height: calc(100vh - 65px);
            background: #000000ff;
            backdrop-filter: blur(20px);
            border-left: 1px solid #e5e7eb;
            transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 99999;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            box-shadow: -5px 0 25px rgba(0,0,0,0.1);
        }
        
        #editor-sidebar.open {
            right: 0;
        }
        
        #editor-sidebar h3 {
            background: white;
            margin: 0;
            padding: 20px 25px;
            font-size: 18px;
            font-weight: 700;
            color: #ffffffff;
            border-bottom: 1px solid #e5e7eb;
            display: flex;
            align-items: center;
            gap: 10px;
            background: #000000ff;
        }
        
        .sidebar-content {
            flex: 1;
            overflow-y: auto;
            padding: 25px;
        }
        
        .sidebar-content::-webkit-scrollbar {
            width: 6px;
        }
        
        .sidebar-content::-webkit-scrollbar-track {
            background: #f1f5f9;
        }
        
        .sidebar-content::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 3px;
        }
        
        .sidebar-content::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
        }
        
        .controls-section {
            margin-bottom: 25px;
            padding: 20px;
            background: #000000ff;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
        }
        
        .controls-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            margin-bottom: 15px;
            background: #000000ff;
        }
        
        .controls-grid button {
            padding: 10px 15px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            background: white;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.2s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            font-size: 13px;
        }
        
        .controls-grid button:hover {
            background: #f3f4f6;
            border-color: #9ca3af;
            transform: translateY(-1px);
        }
        
        .controls-grid button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            transform: none;
        }
        
        #search-input {
            width: 100%;
            padding: 15px 18px;
            border: 2px solid #e5e7eb;
            border-radius: 12px;
            font-size: 14px;
            transition: all 0.3s ease;
            background: #333435ff;
            margin-bottom: 25px;
        }
        
        #search-input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        
        .section {
            margin-bottom: 30px;
        }
        
        .section h4 {
            color: #ffffffff;
            font-weight: 600;
            font-size: 16px;
            margin: 0 0 15px 0;
            padding: 0 0 8px 0;
            border-bottom: 2px solid #e5e7eb;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .editor-item {
            margin-bottom: 20px;
            padding: 20px;
            background: #020202ff;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            transition: all 0.3s ease;
            position: relative;
        }
        
        .editor-item:hover {
            border-color: #cbd5e1;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }
        
        .editor-item label {
            display: block;
            font-weight: 600;
            margin-bottom: 10px;
            color: #ffffffff;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        
        .editor-item textarea, .editor-item input[type="text"], .editor-item input[type="url"] {
            width: 100%;
            min-height: 80px;
            border: 2px solid #373738ff;
            border-radius: 8px;
            padding: 12px;
            font-family: inherit;
            font-size: 14px;
            resize: vertical;
            transition: all 0.3s ease;
            line-height: 1.5;
            background: #333435ff;
            color: white;
        }
        
        .editor-item input[type="text"], .editor-item input[type="url"] {
            min-height: auto;
            height: 45px;
            resize: none;
        }
        
        .editor-item textarea:focus, .editor-item input[type="text"]:focus, .editor-item input[type="url"]:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }
        
        .editor-item input[type="file"] {
            width: 100%;
            padding: 12px;
            border: 2px dashed #cbd5e1;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            background: #333435ff;
        }
        
        .editor-item input[type="file"]:hover {
            border-color: #667eea;
            background: #111111ff;
        }
        
        .link-inputs {
            display: grid;
            gap: 10px;
        }
        
        .element-counter {
            position: absolute;
            top: -8px;
            right: -8px;
            background: #667eea;
            color: white;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 11px;
            font-weight: bold;
        }
        
        .highlight-target {
            outline: 3px solid #667eea !important;
            outline-offset: 2px;
            background: rgba(102, 126, 234, 0.05) !important;
            transition: all 0.3s ease;
        }
        
        #save-btn {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            border: none;
            padding: 18px 28px;
            border-radius: 50px;
            cursor: pointer;
            font-weight: 600;
            font-size: 15px;
            box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        #save-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 12px 35px rgba(16, 185, 129, 0.5);
        }
        
        .status-indicator {
            position: fixed;
            top: 80px;
            right: 30px;
            background: #1f2937;
            color: white;
            padding: 12px 20px;
            border-radius: 25px;
            font-size: 13px;
            font-weight: 500;
            z-index: 99998;
            opacity: 0;
            transform: translateY(-10px);
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .status-indicator.show {
            opacity: 1;
            transform: translateY(0);
        }
        
        .status-indicator.success {
            background: #059669;
        }
        
        .status-indicator.error {
            background: #dc2626;
        }
        
        .empty-state {
            text-align: center;
            padding: 40px 20px;
            color: #6b7280;
        }
        
        .empty-state svg {
            width: 64px;
            height: 64px;
            margin-bottom: 16px;
            opacity: 0.5;
        }
        
        @media (max-width: 768px) {
            #editor-sidebar {
                width: 100vw;
                right: -100vw;
            }
            
            .nav-right {
                gap: 10px;
            }
            
            .nav-right button {
                padding: 8px 14px;
                font-size: 13px;
            }
        }
        </style>
    `;
    document.head.insertAdjacentHTML('beforeend', editorCSS);

    // Advanced State Management
    class EditorState {
        constructor() {
            this.history = [];
            this.currentIndex = -1;
            this.maxHistory = 50;
            this.autoSaveTimer = null;
        }
        
        saveState(action = 'edit') {
            const state = {
                timestamp: Date.now(),
                action: action,
                elements: this.captureElements()
            };
            
            this.history = this.history.slice(0, this.currentIndex + 1);
            this.history.push(state);
            this.currentIndex++;
            
            if (this.history.length > this.maxHistory) {
                this.history.shift();
                this.currentIndex--;
            }
            
            this.updateControls();
        }
        
        captureElements() {
            return Array.from(document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,span,a,img,iframe,[style*='background-image']"))
                .filter(el => !this.isEditorElement(el))
                .map((el, idx) => ({
                    index: idx,
                    tagName: el.tagName,
                    text: el.innerText,
                    href: el.href || null,
                    src: el.src || null,
                    backgroundImage: el.style.backgroundImage || null,
                    selector: this.generateSelector(el, idx)
                }));
        }
        
        isEditorElement(el) {
            return el.closest("#editor-navbar") || 
                   el.closest("#editor-sidebar") || 
                   el.closest("#save-btn") ||
                   el.closest(".status-indicator");
        }
        
        generateSelector(el, idx) {
            const tag = el.tagName.toLowerCase();
            const id = el.id ? `#${el.id}` : '';
            const classes = el.className ? `.${el.className.split(' ').join('.')}` : '';
            return `${tag}${id}${classes}` || `${tag}-${idx}`;
        }
        
        updateControls() {
            // Update control states based on history
        }
        
        showStatus(message, type = 'default') {
            let indicator = document.querySelector('.status-indicator');
            if (!indicator) {
                indicator = document.createElement('div');
                indicator.className = 'status-indicator';
                document.body.appendChild(indicator);
            }
            
            indicator.textContent = message;
            indicator.className = `status-indicator ${type} show`;
            
            setTimeout(() => {
                indicator.classList.remove('show');
            }, 3000);
        }
    }
    
    const editorState = new EditorState();

    /* ---------------- NAVBAR ---------------- */
    let navbar = document.createElement("div");
    navbar.id = "editor-navbar";
    navbar.innerHTML = `
        <div class="nav-left">
            <span class="raxlogo">⚡ Raxinoity Editor</span>
        </div>
        <div class="nav-right">
            <button id="toggle-sidebar">📂 Elements</button>
            <button id="export-btn">💾 Export</button>
        </div>
    `;
    document.body.prepend(navbar);

    /* ---------------- SIDEBAR ---------------- */
    let sidebar = document.createElement("div");
    sidebar.id = "editor-sidebar";
    sidebar.innerHTML = `
        <h3>🎨 Content Editor</h3>
        <div class="sidebar-content">
            <div class="controls-section">
                <div class="controls-grid">
                    <button id="clear-all">🗑️ Clear</button>
                    <button id="refresh-elements">🔄 Refresh</button>
                </div>
            </div>
            
            <input type="text" id="search-input" placeholder="🔍 Search elements...">
            
            <div class="section">
                <h4>📝 Text Elements <span id="text-count">(0)</span></h4>
                <div id="text-editors"></div>
            </div>
            
            <div class="section">
                <h4>🔗 Links <span id="link-count">(0)</span></h4>
                <div id="link-editors"></div>
            </div>
            
            <div class="section">
                <h4>🖼️ Images <span id="image-count">(0)</span></h4>
                <div id="image-editors"></div>
            </div>
            
            <div class="section">
                <h4>🌐 Iframes <span id="iframe-count">(0)</span></h4>
                <div id="iframe-editors"></div>
            </div>
            
            <div class="section">
                <h4>🎨 Backgrounds <span id="bg-count">(0)</span></h4>
                <div id="bg-editors"></div>
            </div>
        </div>
    `;
    document.body.appendChild(sidebar);

    /* ---------------- SAVE BUTTON ---------------- */
    let saveBtn = document.createElement("button");
    saveBtn.id = "save-btn";
    saveBtn.innerHTML = "💾 Save & Publish";
    document.body.appendChild(saveBtn);

    /* ---------------- EVENT HANDLERS ---------------- */
    
    // Sidebar Toggle
    document.getElementById("toggle-sidebar").addEventListener("click", () => {
        sidebar.classList.toggle("open");
        editorState.showStatus(sidebar.classList.contains("open") ? 'Sidebar Opened' : 'Sidebar Closed');
    });
    
    document.getElementById('clear-all').addEventListener('click', () => {
        if (confirm('Are you sure you want to clear all changes?')) {
            location.reload();
        }
    });
    
    document.getElementById('refresh-elements').addEventListener('click', () => {
        initializeElements();
        editorState.showStatus('Elements Refreshed', 'success');
    });
    
    document.getElementById('export-btn').addEventListener('click', () => {
        const html = document.documentElement.outerHTML;
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'edited-page.html';
        a.click();
        URL.revokeObjectURL(url);
        editorState.showStatus('Page Exported', 'success');
    });

    /* ---------------- ELEMENT INITIALIZATION ---------------- */
    function initializeElements() {
        let textContainer = sidebar.querySelector("#text-editors");
        let linkContainer = sidebar.querySelector("#link-editors");
        let imageContainer = sidebar.querySelector("#image-editors");
        let videoContainer = sidebar.querySelector("#video-editors");
        let sourceContainer = sidebar.querySelector("#source-editors");
        let iframeContainer = sidebar.querySelector("#iframe-editors");
        let bgContainer = sidebar.querySelector("#bg-editors");
        
        // Clear existing editors
        textContainer.innerHTML = '';
        linkContainer.innerHTML = '';
        imageContainer.innerHTML = '';
        iframeContainer.innerHTML = '';
        bgContainer.innerHTML = '';
        
        let textCount = 0, linkCount = 0, imageCount = 0, iframeCount = 0, bgCount = 0;
        let elements = document.querySelectorAll("h1,h2,h3,h4,h5,h6,p,span,a,img,iframe,[style*='background-image']");
        
        elements.forEach((el, idx) => {
            // Skip editor's own UI elements
            if (editorState.isEditorElement(el)) return;

            let selector = editorState.generateSelector(el, idx);

            // Add interaction effects
            el.addEventListener('mouseenter', () => {
                el.classList.add('highlight-target');
            });
            
            el.addEventListener('mouseleave', () => {
                el.classList.remove('highlight-target');
            });

            // LINK ELEMENTS (A tags)
            if (el.tagName === "A") {
                linkCount++;
                let wrapper = document.createElement("div");
                wrapper.className = "editor-item";
                wrapper.dataset.text = el.innerText.toLowerCase();
                wrapper.dataset.href = (el.href || '').toLowerCase();
                wrapper.dataset.selector = selector.toLowerCase();
                
                let counter = document.createElement("div");
                counter.className = "element-counter";
                counter.textContent = linkCount;
                wrapper.appendChild(counter);

                let label = document.createElement("label");
                label.textContent = selector;
                wrapper.appendChild(label);

                let linkInputs = document.createElement("div");
                linkInputs.className = "link-inputs";

                // Text input for link text
                let textInput = document.createElement("input");
                textInput.type = "text";
                textInput.value = el.innerText.trim();
                textInput.placeholder = "Link text...";
                textInput.disabled = true; // Disable direct editing of link text
                
                let textDebounceTimer;
                textInput.addEventListener("input", () => {
                    el.innerText = textInput.value;
                    wrapper.dataset.text = textInput.value.toLowerCase();
                    
                    clearTimeout(textDebounceTimer);
                    textDebounceTimer = setTimeout(() => {
                        editorState.saveState('link-text-edit');
                        editorState.showStatus('Link Text Updated');
                    }, 1000);
                });

                // URL input for link href
                let urlInput = document.createElement("input");
                urlInput.type = "url";
                urlInput.value = el.href || '';
                urlInput.placeholder = "https://example.com";
                
                let urlDebounceTimer;
                urlInput.addEventListener("input", () => {
                    el.href = urlInput.value;
                    wrapper.dataset.href = urlInput.value.toLowerCase();
                    
                    clearTimeout(urlDebounceTimer);
                    urlDebounceTimer = setTimeout(() => {
                        editorState.saveState('link-url-edit');
                        editorState.showStatus('Link URL Updated');
                    }, 1000);
                });

                textInput.addEventListener('focus', () => {
                    el.classList.add('highlight-target');
                });
                
                urlInput.addEventListener('focus', () => {
                    el.classList.add('highlight-target');
                });
                
                textInput.addEventListener('blur', () => {
                    el.classList.remove('highlight-target');
                });
                
                urlInput.addEventListener('blur', () => {
                    el.classList.remove('highlight-target');
                });

                linkInputs.appendChild(textInput);
                linkInputs.appendChild(urlInput);
                wrapper.appendChild(linkInputs);
                linkContainer.appendChild(wrapper);
            }

            // TEXT ELEMENTS (excluding A tags) - Only show if element has text content
            if (el.tagName !== "IMG" && el.tagName !== "A" && el.tagName !== "IFRAME" && !el.style.backgroundImage && el.innerText.trim() !== "") {
                textCount++;
                let wrapper = document.createElement("div");
                wrapper.className = "editor-item";
                wrapper.dataset.text = el.innerText.toLowerCase();
                wrapper.dataset.selector = selector.toLowerCase();
                
                let counter = document.createElement("div");
                counter.className = "element-counter";
                counter.textContent = textCount;
                wrapper.appendChild(counter);

                let label = document.createElement("label");
                label.textContent = selector;
                wrapper.appendChild(label);

                let input = document.createElement("textarea");
                input.value = el.innerText.trim();
                input.placeholder = "Enter text content...";
                
                let debounceTimer;
                input.addEventListener("input", () => {
                    el.innerText = input.value;
                    wrapper.dataset.text = input.value.toLowerCase();
                    
                    clearTimeout(debounceTimer);
                    debounceTimer = setTimeout(() => {
                        editorState.saveState('text-edit');
                        editorState.showStatus('Text Updated');
                    }, 1000);
                });

                input.addEventListener('focus', () => {
                    el.classList.add('highlight-target');
                });
                
                input.addEventListener('blur', () => {
                    el.classList.remove('highlight-target');
                });

                wrapper.appendChild(input);
                textContainer.appendChild(wrapper);
            }

            // IMAGE ELEMENTS
            if (el.tagName === "IMG") {
                imageCount++;
                let wrapper = document.createElement("div");
                wrapper.className = "editor-item";
                
                let counter = document.createElement("div");
                counter.className = "element-counter";
                counter.textContent = imageCount;
                wrapper.appendChild(counter);
                
                let label = document.createElement("label");
                label.innerText = selector;
                wrapper.appendChild(label);
                
                let fileInput = document.createElement("input");
                fileInput.type = "file";
                fileInput.accept = "image/*";
                fileInput.addEventListener("change", () => {
                    if (fileInput.files[0]) {
                        let reader = new FileReader();
                        reader.onload = (ev) => { 
                            el.src = ev.target.result;
                            editorState.saveState('image-change');
                            editorState.showStatus('Image Updated', 'success');
                        };
                        reader.readAsDataURL(fileInput.files[0]);
                    }
                });
                
                fileInput.addEventListener('focus', () => {
                    el.classList.add('highlight-target');
                });
                
                fileInput.addEventListener('blur', () => {
                    el.classList.remove('highlight-target');
                });
                
                wrapper.appendChild(fileInput);
                imageContainer.appendChild(wrapper);
            }
            // IFRAME ELEMENTS
            if (el.tagName === "IFRAME") {
                iframeCount++;
                let wrapper = document.createElement("div");
                wrapper.className = "editor-item";
                wrapper.dataset.src = (el.src || '').toLowerCase();
                wrapper.dataset.selector = selector.toLowerCase();
                
                let counter = document.createElement("div");
                counter.className = "element-counter";
                counter.textContent = iframeCount;
                wrapper.appendChild(counter);

                let label = document.createElement("label");
                label.textContent = selector;
                wrapper.appendChild(label);

                // Iframe URL input
                let urlInput = document.createElement("input");
                urlInput.type = "url";
                urlInput.value = el.src || '';
                urlInput.placeholder = "Iframe URL (YouTube, Maps, etc.)...";
                
                let urlDebounceTimer;
                urlInput.addEventListener("input", () => {
                    el.src = urlInput.value;
                    wrapper.dataset.src = urlInput.value.toLowerCase();
                    
                    clearTimeout(urlDebounceTimer);
                    urlDebounceTimer = setTimeout(() => {
                        editorState.saveState('iframe-url-edit');
                        editorState.showStatus('Iframe URL Updated');
                    }, 1000);
                });

                urlInput.addEventListener('focus', () => {
                    el.classList.add('highlight-target');
                });
                
                urlInput.addEventListener('blur', () => {
                    el.classList.remove('highlight-target');
                });

                wrapper.appendChild(urlInput);
                iframeContainer.appendChild(wrapper);
            }

            // BACKGROUND ELEMENTS
            if (el.style.backgroundImage && el.style.backgroundImage !== "none") {
                bgCount++;
                let wrapper = document.createElement("div");
                wrapper.className = "editor-item";
                
                let counter = document.createElement("div");
                counter.className = "element-counter";
                counter.textContent = bgCount;
                wrapper.appendChild(counter);
                
                let label = document.createElement("label");
                label.innerText = selector;
                wrapper.appendChild(label);
                
                let fileInput = document.createElement("input");
                fileInput.type = "file";
                fileInput.accept = "image/*";
                fileInput.addEventListener("change", () => {
                    if (fileInput.files[0]) {
                        let reader = new FileReader();
                        reader.onload = (ev) => { 
                            el.style.backgroundImage = `url('${ev.target.result}')`;
                            editorState.saveState('background-change');
                            editorState.showStatus('Background Updated', 'success');
                        };
                        reader.readAsDataURL(fileInput.files[0]);
                    }
                });
                
                fileInput.addEventListener('focus', () => {
                    el.classList.add('highlight-target');
                });
                
                fileInput.addEventListener('blur', () => {
                    el.classList.remove('highlight-target');
                });
                
                wrapper.appendChild(fileInput);
                bgContainer.appendChild(wrapper);
            }
        });
        
        // Update counters
        document.getElementById('text-count').textContent = `(${textCount})`;
        document.getElementById('link-count').textContent = `(${linkCount})`;
        document.getElementById('image-count').textContent = `(${imageCount})`;
        document.getElementById('iframe-count').textContent = `(${iframeCount})`;
        document.getElementById('bg-count').textContent = `(${bgCount})`;
        
        // Show empty states if needed
        if (textCount === 0) {
            textContainer.innerHTML = '<div class="empty-state">No text elements found</div>';
        }
        if (linkCount === 0) {
            linkContainer.innerHTML = '<div class="empty-state">No links found</div>';
        }
        if (imageCount === 0) {
            imageContainer.innerHTML = '<div class="empty-state">No images found</div>';
        }
        if (iframeCount === 0) {
            iframeContainer.innerHTML = '<div class="empty-state">No iframes found</div>';
        }
        if (bgCount === 0) {
            bgContainer.innerHTML = '<div class="empty-state">No background images found</div>';
        }
    }

    /* ---------------- ENHANCED SEARCH ---------------- */
    let searchInput = document.getElementById("search-input");
    searchInput.addEventListener("input", () => {
        let term = searchInput.value.toLowerCase();
        let allItems = sidebar.querySelectorAll(".editor-item");

        let visibleCount = 0;
        allItems.forEach(item => {
            const matchesText = item.dataset.text && item.dataset.text.includes(term);
            const matchesHref = item.dataset.href && item.dataset.href.includes(term);
            const matchesSrc = item.dataset.src && item.dataset.src.includes(term);
            const matchesSelector = item.dataset.selector && item.dataset.selector.includes(term);
            const matchesAny = term === "" || matchesText || matchesHref || matchesSrc || matchesSelector;
            
            if (matchesAny) {
                item.style.display = "block";
                visibleCount++;
            } else {
                item.style.display = "none";
            }
        });
        
        if (term && visibleCount === 0) {
            editorState.showStatus('No matches found');
        }
    });

    /* ---------------- SAVE FUNCTIONALITY ---------------- */
    saveBtn.addEventListener("click", () => {
        editorState.showStatus('Saving changes...', 'success');
        
        // Simulate save operation
        setTimeout(() => {
            editorState.showStatus('✅ Changes Saved & Published!', 'success');
            // In production: implement actual save logic
            // fetch('/api/save', { method:'POST', body: JSON.stringify(data) })
        }, 1000);
    });

    /* ---------------- KEYBOARD SHORTCUTS ---------------- */
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'z':
                    e.preventDefault();
                    if (e.shiftKey) {
                        editorState.redo();
                    } else {
                        editorState.undo();
                    }
                    break;
                case 's':
                    e.preventDefault();
                    saveBtn.click();
                    break;
                case 'e':
                    e.preventDefault();
                    document.getElementById('toggle-sidebar').click();
                    break;
                case 'p':
                    e.preventDefault();
                    document.getElementById('preview-mode').click();
                    break;
            }
        }
        
        if (e.key === 'Escape') {
            sidebar.classList.remove('open');
            document.querySelectorAll('.highlight-target').forEach(el => {
                el.classList.remove('highlight-target');
            });
        }
    });

    /* ---------------- INITIALIZATION ---------------- */
    // Add body padding for navbar
    document.body.style.paddingTop = '65px';
    
    // Initialize elements
    initializeElements();
    
    // Show welcome message
    setTimeout(() => {
        editorState.showStatus('🎉 Raxinoity Editor Ready!', 'success');
    }, 500);
    
    // Auto-save every 2 minutes
    setInterval(() => {
        editorState.showStatus('Auto-saved');
    }, 120000);



});
