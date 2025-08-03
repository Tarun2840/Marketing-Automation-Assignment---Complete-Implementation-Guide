// Global variables
let currentTask = 'task1';
let chatStep = 0;
let chatData = {};

// Task switching functionality
function showTask(taskId) {
    // Hide all tasks
    document.querySelectorAll('.task-content').forEach(task => {
        task.classList.add('hidden');
    });
    
    // Show selected task
    document.getElementById(taskId).classList.remove('hidden');
    currentTask = taskId;
    
    // Update button states
    document.querySelectorAll('.task-btn').forEach(btn => {
        btn.classList.remove('ring-4', 'ring-blue-300');
    });
    event.target.closest('.task-btn').classList.add('ring-4', 'ring-blue-300');
    
    // Initialize task-specific functionality
    if (taskId === 'task1') {
        initializeWorkflow();
    } else if (taskId === 'task2') {
        initializeChat();
    } else if (taskId === 'task3') {
        initializeForm();
    }
}

// Task 1: Workflow Visualization
function initializeWorkflow() {
    const container = document.getElementById('workflow-container');
    container.innerHTML = `
        <div class="workflow-diagram">
            <div class="workflow-step start-step" id="step-0">
                <div class="step-icon">
                    <i class="fas fa-user-plus"></i>
                </div>
                <div class="step-title">User Signup</div>
                <div class="step-desc">New user registration</div>
            </div>
            
            <div class="workflow-arrow">
                <i class="fas fa-arrow-down"></i>
                <span>Immediate</span>
            </div>
            
            <div class="workflow-step parallel-step" id="step-1">
                <div class="step-icon">
                    <i class="fas fa-broadcast-tower"></i>
                </div>
                <div class="step-title">Welcome Messages</div>
                <div class="parallel-channels">
                    <span class="channel whatsapp"><i class="fab fa-whatsapp"></i> WhatsApp</span>
                    <span class="channel sms"><i class="fas fa-sms"></i> SMS</span>
                    <span class="channel email"><i class="fas fa-envelope"></i> Email</span>
                </div>
            </div>
            
            <div class="workflow-arrow">
                <i class="fas fa-arrow-down"></i>
                <span>24 hours later</span>
            </div>
            
            <div class="workflow-step decision-step" id="step-2">
                <div class="step-icon">
                    <i class="fas fa-question-circle"></i>
                </div>
                <div class="step-title">Profile Complete?</div>
                <div class="step-desc">Check completion status</div>
            </div>
            
            <div class="workflow-branches">
                <div class="branch-yes">
                    <div class="workflow-arrow horizontal">
                        <i class="fas fa-arrow-right"></i>
                        <span>Yes</span>
                    </div>
                    <div class="workflow-step success-step">
                        <div class="step-icon">
                            <i class="fas fa-trophy"></i>
                        </div>
                        <div class="step-title">Congratulations</div>
                        <div class="step-desc">Success message</div>
                    </div>
                </div>
                
                <div class="branch-no">
                    <div class="workflow-arrow">
                        <i class="fas fa-arrow-down"></i>
                        <span>No</span>
                    </div>
                    <div class="workflow-step loop-step" id="step-3">
                        <div class="step-icon">
                            <i class="fas fa-sync-alt"></i>
                        </div>
                        <div class="step-title">3-Day Reminder Loop</div>
                        <div class="loop-details">
                            <div class="fallback-logic">WhatsApp → SMS Fallback</div>
                            <div class="timing">24hr intervals</div>
                        </div>
                    </div>
                    
                    <div class="workflow-arrow">
                        <i class="fas fa-arrow-down"></i>
                        <span>After 3 days</span>
                    </div>
                    
                    <div class="workflow-step final-step">
                        <div class="step-icon">
                            <i class="fas fa-envelope-open"></i>
                        </div>
                        <div class="step-title">Final Email</div>
                        <div class="step-desc">Last attempt</div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add CSS for workflow visualization
    if (!document.getElementById('workflow-styles')) {
        const style = document.createElement('style');
        style.id = 'workflow-styles';
        style.textContent = `
            .workflow-diagram {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 1.5rem;
                padding: 2rem;
                font-family: system-ui, -apple-system, sans-serif;
            }
            
            .workflow-step {
                background: white;
                border: 3px solid #e5e7eb;
                border-radius: 1rem;
                padding: 1.5rem;
                min-width: 200px;
                text-align: center;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
                position: relative;
                overflow: hidden;
            }
            
            .workflow-step::before {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
                transition: left 0.5s;
            }
            
            .workflow-step.active {
                transform: scale(1.05);
                box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            }
            
            .workflow-step.active::before {
                left: 100%;
            }
            
            .step-icon {
                font-size: 2rem;
                margin-bottom: 0.5rem;
            }
            
            .step-title {
                font-weight: 700;
                font-size: 1.1rem;
                margin-bottom: 0.25rem;
            }
            
            .step-desc {
                font-size: 0.875rem;
                color: #6b7280;
            }
            
            .start-step { 
                border-color: #10b981; 
                background: linear-gradient(135deg, #ecfdf5, #d1fae5);
            }
            .start-step .step-icon { color: #10b981; }
            
            .decision-step { 
                border-color: #f59e0b; 
                background: linear-gradient(135deg, #fffbeb, #fef3c7);
                border-radius: 50%;
                width: 180px;
                height: 180px;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
            .decision-step .step-icon { color: #f59e0b; }
            
            .success-step { 
                border-color: #10b981; 
                background: linear-gradient(135deg, #ecfdf5, #d1fae5);
            }
            .success-step .step-icon { color: #10b981; }
            
            .loop-step { 
                border-color: #8b5cf6; 
                background: linear-gradient(135deg, #f5f3ff, #ede9fe);
            }
            .loop-step .step-icon { color: #8b5cf6; }
            
            .final-step { 
                border-color: #ef4444; 
                background: linear-gradient(135deg, #fef2f2, #fecaca);
            }
            .final-step .step-icon { color: #ef4444; }
            
            .parallel-step {
                border-color: #3b82f6;
                background: linear-gradient(135deg, #eff6ff, #dbeafe);
            }
            .parallel-step .step-icon { color: #3b82f6; }
            
            .workflow-arrow {
                display: flex;
                flex-direction: column;
                align-items: center;
                color: #6b7280;
                font-weight: 600;
                gap: 0.5rem;
            }
            
            .workflow-arrow i {
                font-size: 1.5rem;
            }
            
            .workflow-arrow span {
                font-size: 0.875rem;
                background: white;
                padding: 0.25rem 0.75rem;
                border-radius: 1rem;
                border: 2px solid #e5e7eb;
            }
            
            .workflow-arrow.horizontal {
                flex-direction: row;
            }
            
            .parallel-channels {
                display: flex;
                gap: 0.5rem;
                justify-content: center;
                margin-top: 0.75rem;
                flex-wrap: wrap;
            }
            
            .channel {
                padding: 0.375rem 0.75rem;
                border-radius: 0.5rem;
                font-size: 0.75rem;
                color: white;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 0.25rem;
            }
            
            .whatsapp { background: linear-gradient(135deg, #25d366, #128c7e); }
            .sms { background: linear-gradient(135deg, #0084ff, #0066cc); }
            .email { background: linear-gradient(135deg, #ea4335, #d33b2c); }
            
            .workflow-branches {
                display: flex;
                gap: 4rem;
                align-items: flex-start;
                justify-content: center;
                width: 100%;
            }
            
            .loop-details {
                margin-top: 0.75rem;
            }
            
            .fallback-logic {
                font-size: 0.75rem;
                color: #8b5cf6;
                font-weight: 600;
                margin-bottom: 0.25rem;
            }
            
            .timing {
                font-size: 0.75rem;
                color: #6b7280;
            }
            
            @media (max-width: 768px) {
                .workflow-branches {
                    flex-direction: column;
                    gap: 2rem;
                }
                
                .workflow-arrow.horizontal {
                    flex-direction: column;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

function animateWorkflow() {
    const steps = document.querySelectorAll('.workflow-step');
    steps.forEach(step => step.classList.remove('active'));
    
    let currentStep = 0;
    const animate = () => {
        if (currentStep < steps.length) {
            steps[currentStep].classList.add('active');
            currentStep++;
            setTimeout(animate, 2000);
        }
    };
    animate();
}

// Task 2: Chatbot Functionality
function initializeChat() {
    chatStep = 0;
    chatData = {};
    const container = document.getElementById('chat-container');
    container.innerHTML = '';
    
    addMessage('bot', 'Welcome to NxtWave Career Kickstarter! 🚀');
    setTimeout(() => {
        addMessage('bot', 'I\'m here to help you discover the perfect tech career path. Ready to get started?');
        setTimeout(() => {
            showChatOptions(['Let\'s Begin!', 'Tell Me More', 'Not Interested']);
        }, 1500);
    }, 1000);
}

function addMessage(sender, message) {
    const container = document.getElementById('chat-container');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender === 'bot' ? 'bot-message' : 'user-message'} opacity-0 transform translate-y-4`;
    
    if (sender === 'bot') {
        messageDiv.innerHTML = `
            <div class="flex items-start gap-3 mb-4">
                <div class="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white shadow-lg">
                    <i class="fas fa-robot text-sm"></i>
                </div>
                <div class="bg-white p-4 rounded-2xl rounded-tl-sm shadow-lg max-w-xs border border-gray-100">
                    <div class="text-gray-800">${message}</div>
                </div>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="flex items-start gap-3 mb-4 justify-end">
                <div class="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-2xl rounded-tr-sm shadow-lg max-w-xs">
                    ${message}
                </div>
                <div class="w-10 h-10 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white shadow-lg">
                    <i class="fas fa-user text-sm"></i>
                </div>
            </div>
        `;
    }
    
    container.appendChild(messageDiv);
    
    // Animate message appearance
    setTimeout(() => {
        messageDiv.classList.remove('opacity-0', 'transform', 'translate-y-4');
        messageDiv.classList.add('transition-all', 'duration-500');
    }, 100);
    
    container.scrollTop = container.scrollHeight;
}

function showChatOptions(options) {
    const optionsContainer = document.getElementById('chat-options');
    optionsContainer.innerHTML = '';
    
    options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'w-full text-left p-4 bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200 rounded-xl hover:from-blue-50 hover:to-blue-100 hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg opacity-0 translate-y-4';
        button.innerHTML = `
            <div class="flex items-center justify-between">
                <span class="font-medium text-gray-700">${option}</span>
                <i class="fas fa-arrow-right text-gray-400"></i>
            </div>
        `;
        button.onclick = () => handleChatOption(option);
        optionsContainer.appendChild(button);
        
        // Animate button appearance
        setTimeout(() => {
            button.classList.remove('opacity-0', 'translate-y-4');
            button.classList.add('transition-all', 'duration-300');
        }, index * 100 + 200);
    });
}

function handleChatOption(option) {
    addMessage('user', option);
    document.getElementById('chat-options').innerHTML = '';
    
    setTimeout(() => {
        switch (chatStep) {
            case 0:
                if (option === 'Let\'s Begin!') {
                    chatStep = 1;
                    addMessage('bot', 'Fantastic! Let\'s start with the basics. What\'s your full name?');
                    showTextInput('name');
                } else if (option === 'Not Interested') {
                    addMessage('bot', 'No worries at all! Feel free to come back anytime. Have a wonderful day! 👋');
                } else {
                    addMessage('bot', 'NxtWave offers comprehensive career transformation programs in Full Stack Development, Data Science, AI-ML, and Cybersecurity. We\'ve helped thousands transition to high-paying tech careers!');
                    setTimeout(() => {
                        showChatOptions(['Sounds Great!', 'Not For Me']);
                    }, 1500);
                }
                break;
                
            case 2:
                chatStep = 3;
                chatData.email = option;
                addMessage('bot', 'Perfect! Now, what\'s your current situation?');
                showChatOptions(['I\'m a Student', 'I\'m Working Professional', 'I\'m Between Jobs']);
                break;
                
            case 3:
                chatStep = 4;
                chatData.status = option;
                addMessage('bot', 'Got it! What\'s your educational/professional background?');
                showChatOptions(['Tech Background', 'Non-Tech Background', 'Mixed Experience']);
                break;
                
            case 4:
                chatStep = 5;
                chatData.background = option;
                addMessage('bot', 'Excellent! Which career path excites you the most?');
                showChatOptions(['Full Stack Development', 'Data Science', 'AI-ML', 'Cybersecurity']);
                break;
                
            case 5:
                chatStep = 6;
                chatData.careerPath = option;
                addMessage('bot', 'Great choice! Are you ready to start your transformation journey in the next 30 days?');
                showChatOptions(['Yes, I\'m Ready!', 'Maybe in 2-3 Months', 'Just Exploring Options']);
                break;
                
            case 6:
                chatData.readiness = option;
                processLead();
                break;
        }
    }, 800);
}

function showTextInput(field) {
    const optionsContainer = document.getElementById('chat-options');
    optionsContainer.innerHTML = `
        <div class="flex gap-3">
            <input type="text" id="text-input" placeholder="Type your ${field}..." 
                   class="flex-1 p-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300">
            <button onclick="submitTextInput('${field}')" 
                    class="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                <i class="fas fa-paper-plane"></i>
            </button>
        </div>
    `;
    document.getElementById('text-input').focus();
}

function submitTextInput(field) {
    const input = document.getElementById('text-input');
    const value = input.value.trim();
    
    if (value) {
        addMessage('user', value);
        chatData[field] = value;
        document.getElementById('chat-options').innerHTML = '';
        
        setTimeout(() => {
            if (field === 'name') {
                chatStep = 2;
                addMessage('bot', `Nice to meet you, ${value}! What's your email address?`);
                showTextInput('email');
            } else if (field === 'phone') {
                chatStep = 3;
                addMessage('bot', 'Perfect! Now, what\'s your current situation?');
                showChatOptions(['I\'m a Student', 'I\'m Working Professional', 'I\'m Between Jobs']);
            }
        }, 800);
    }
}

function processLead() {
    let leadStatus = 'Cold Lead';
    let message = '';
    
    // Advanced lead scoring logic
    if (chatData.readiness === 'Yes, I\'m Ready!' && 
        (chatData.status === 'I\'m a Student' || chatData.background === 'Tech Background')) {
        leadStatus = 'Hot Lead';
        message = `🔥 Fantastic! You're a perfect fit for our ${chatData.careerPath} program. `;
        
        if (chatData.status === 'I\'m a Student' && chatData.background === 'Tech Background') {
            message += 'As a tech student, you\'ll absolutely love our hands-on, project-based approach!';
        } else if (chatData.status === 'I\'m Working Professional') {
            message += 'Many working professionals like you have successfully transitioned with us while keeping their current job!';
        }
    } else if (chatData.readiness === 'Maybe in 2-3 Months') {
        leadStatus = 'Warm Lead';
        message = '⏰ That\'s perfectly fine! We\'ll keep you updated on our programs, success stories, and special offers.';
    } else {
        leadStatus = 'Cold Lead';
        message = '📚 Thanks for your interest! Feel free to explore our free resources and reach out when you\'re ready to take the next step.';
    }
    
    addMessage('bot', message);
    
    setTimeout(() => {
        addMessage('bot', '✅ I\'ve recorded your information securely. Our career counselors will reach out to you soon with personalized recommendations and next steps!');
        
        // Display the JSON payload
        const payload = {
            name: chatData.name,
            email: chatData.email,
            phone: chatData.phone || 'Not provided',
            status: leadStatus,
            careerPath: chatData.careerPath,
            currentSituation: chatData.status,
            background: chatData.background,
            readiness: chatData.readiness,
            source: 'Webinar Bot',
            timestamp: new Date().toISOString()
        };
        
        document.getElementById('json-payload').textContent = JSON.stringify(payload, null, 2);
        
        setTimeout(() => {
            addMessage('bot', '🎯 Would you like to start over with different information or learn about another career path?');
            showChatOptions(['Start Over', 'Learn More', 'End Conversation']);
        }, 2000);
    }, 1500);
}

function resetChat() {
    initializeChat();
}

// Task 3: Form Integration
function initializeForm() {
    const form = document.getElementById('integration-form');
    form.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('form-name').value,
        email: document.getElementById('form-email').value,
        phone: document.getElementById('form-phone').value,
        interest: document.getElementById('form-interest').value,
        timestamp: new Date().toISOString(),
        source: 'Marketing Automation Form'
    };
    
    // Show loading state
    const statusDiv = document.getElementById('form-status');
    statusDiv.className = 'mt-6 p-6 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200';
    statusDiv.innerHTML = `
        <div class="flex items-center">
            <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
            <div>
                <div class="font-semibold text-blue-800">Processing your submission...</div>
                <div class="text-sm text-blue-600">Sending to Google Sheets and triggering email notification</div>
            </div>
        </div>
    `;
    statusDiv.classList.remove('hidden');
    
    // Simulate API call with realistic delay
    setTimeout(() => {
        // Add to simulated Google Sheets
        addToSheetsData(formData);
        
        // Show success message
        statusDiv.className = 'mt-6 p-6 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200';
        statusDiv.innerHTML = `
            <div class="flex items-start">
                <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-4 mt-1">
                    <i class="fas fa-check text-white text-sm"></i>
                </div>
                <div>
                    <div class="font-semibold text-green-800 mb-2">Form submitted successfully! 🎉</div>
                    <div class="text-sm text-green-700 space-y-1">
                        <div>✅ Data saved to Google Sheets</div>
                        <div>✅ Confirmation email sent to ${formData.email}</div>
                        <div>✅ Team notification triggered</div>
                    </div>
                </div>
            </div>
        `;
        
        // Reset form with animation
        const form = document.getElementById('integration-form');
        form.style.transform = 'scale(0.95)';
        form.style.opacity = '0.7';
        
        setTimeout(() => {
            form.reset();
            form.style.transform = 'scale(1)';
            form.style.opacity = '1';
        }, 300);
        
        // Hide status after 8 seconds
        setTimeout(() => {
            statusDiv.classList.add('hidden');
        }, 8000);
        
    }, 2500);
}

function addToSheetsData(data) {
    const tbody = document.getElementById('sheets-data');
    
    // Remove placeholder row if it exists
    const placeholder = tbody.querySelector('td[colspan="5"]');
    if (placeholder) {
        placeholder.parentElement.remove();
    }
    
    const row = document.createElement('tr');
    row.className = 'border-b hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 opacity-0 transform translate-x-4';
    row.innerHTML = `
        <td class="px-6 py-4 font-medium text-gray-900">${data.name}</td>
        <td class="px-6 py-4 text-gray-700">${data.email}</td>
        <td class="px-6 py-4 text-gray-700">${data.phone || 'N/A'}</td>
        <td class="px-6 py-4">
            <span class="px-3 py-1 rounded-full text-xs font-medium ${getInterestColor(data.interest)}">
                ${data.interest || 'N/A'}
            </span>
        </td>
        <td class="px-6 py-4 text-gray-600 text-sm">${new Date(data.timestamp).toLocaleString()}</td>
    `;
    
    tbody.appendChild(row);
    
    // Animate row appearance
    setTimeout(() => {
        row.classList.remove('opacity-0', 'transform', 'translate-x-4');
        row.classList.add('transition-all', 'duration-500');
    }, 100);
}

function getInterestColor(interest) {
    const colors = {
        'marketing': 'bg-purple-100 text-purple-800',
        'sales': 'bg-green-100 text-green-800',
        'analytics': 'bg-blue-100 text-blue-800',
        'other': 'bg-gray-100 text-gray-800'
    };
    return colors[interest] || colors['other'];
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    showTask('task1');
    
    // Add smooth scrolling for better UX
    document.documentElement.style.scrollBehavior = 'smooth';
});

// Handle Enter key in chat input
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && e.target.id === 'text-input') {
        const button = e.target.parentElement.querySelector('button');
        if (button) button.click();
    }
});

// Add some interactive hover effects
document.addEventListener('mouseover', function(e) {
    if (e.target.classList.contains('task-btn')) {
        e.target.style.transform = 'translateY(-2px) scale(1.02)';
    }
});

document.addEventListener('mouseout', function(e) {
    if (e.target.classList.contains('task-btn')) {
        e.target.style.transform = 'translateY(0) scale(1)';
    }
});