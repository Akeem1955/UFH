// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navLinks?.classList.remove('active');
        });
    });

    // Login Form Validation
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const userType = document.querySelector('input[name="user-type"]:checked').value;

            // Simple validation
            if (!email || !password) {
                showAlert('Please fill in all fields', 'error');
                return;
            }

            // Mock login - would normally hit an API endpoint
            login(email, password, userType);
        });
    }

    // Registration Form Validation
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const userType = document.querySelector('input[name="user-type"]:checked').value;

            // Simple validation
            if (!name || !email || !password || !confirmPassword) {
                showAlert('Please fill in all fields', 'error');
                return;
            }

            if (password !== confirmPassword) {
                showAlert('Passwords do not match', 'error');
                return;
            }

            // Mock registration - would normally hit an API endpoint
            register(name, email, password, userType);
        });
    }

    // Job Post Form
    const jobPostForm = document.getElementById('job-post-form');
    if (jobPostForm) {
        jobPostForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const title = document.getElementById('job-title').value;
            const category = document.getElementById('job-category').value;
            const description = document.getElementById('job-description').value;
            const budget = document.getElementById('job-budget').value;

            // Simple validation
            if (!title || !category || !description || !budget) {
                showAlert('Please fill in all fields', 'error');
                return;
            }

            // Mock job posting
            postJob(title, category, description, budget);
        });
    }

    // Accept Job Offer (Student)
    document.querySelectorAll('.accept-job-btn').forEach(button => {
        button.addEventListener('click', function() {
            const jobId = this.getAttribute('data-job-id');
            acceptJobOffer(jobId);
        });
    });

    // Approve/Reject Candidate (Client)
    document.querySelectorAll('.approve-candidate-btn').forEach(button => {
        button.addEventListener('click', function() {
            const jobId = this.getAttribute('data-job-id');
            const candidateId = this.getAttribute('data-candidate-id');
            approveCandidate(jobId, candidateId);
        });
    });

    document.querySelectorAll('.reject-candidate-btn').forEach(button => {
        button.addEventListener('click', function() {
            const jobId = this.getAttribute('data-job-id');
            const candidateId = this.getAttribute('data-candidate-id');
            rejectCandidate(jobId, candidateId);
        });
    });

    // Mark Job Complete (Client)
    document.querySelectorAll('.complete-job-btn').forEach(button => {
        button.addEventListener('click', function() {
            const jobId = this.getAttribute('data-job-id');
            completeJob(jobId);
        });
    });

    // Wallet Deposit/Withdraw
    const depositForm = document.getElementById('deposit-form');
    if (depositForm) {
        depositForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const amount = document.getElementById('deposit-amount').value;
            
            if (!amount || isNaN(amount) || amount <= 0) {
                showAlert('Please enter a valid amount', 'error');
                return;
            }

            depositFunds(parseFloat(amount));
        });
    }

    const withdrawForm = document.getElementById('withdraw-form');
    if (withdrawForm) {
        withdrawForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const amount = document.getElementById('withdraw-amount').value;
            const bankName = document.getElementById('bank-name').value;
            const accountNumber = document.getElementById('account-number').value;
            
            if (!amount || isNaN(amount) || amount <= 0) {
                showAlert('Please enter a valid amount', 'error');
                return;
            }

            if (!bankName || !accountNumber) {
                showAlert('Please enter bank details', 'error');
                return;
            }

            withdrawFunds(parseFloat(amount), bankName, accountNumber);
        });
    }

    // File Uploads
    const resumeUpload = document.getElementById('resume-upload');
    if (resumeUpload) {
        resumeUpload.addEventListener('change', function(e) {
            handleFileUpload(e, 'resume');
        });
    }

    const workSamplesUpload = document.getElementById('work-samples-upload');
    if (workSamplesUpload) {
        workSamplesUpload.addEventListener('change', function(e) {
            handleFileUpload(e, 'work-samples');
        });
    }

    // Chat System
    const chatForm = document.getElementById('chat-form');
    if (chatForm) {
        chatForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const messageInput = document.getElementById('message-input');
            const message = messageInput.value;
            
            if (!message.trim()) return;
            
            sendMessage(message);
            messageInput.value = '';
        });
    }

    // Price Negotiation
    const priceOfferForm = document.getElementById('price-offer-form');
    if (priceOfferForm) {
        priceOfferForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const price = document.getElementById('offer-price').value;
            
            if (!price || isNaN(price) || price <= 0) {
                showAlert('Please enter a valid amount', 'error');
                return;
            }
            
            offerPrice(parseFloat(price));
        });
    }

    // Initialize modals
    initModals();
});

// Modal System
function initModals() {
    // Add event listeners to modal triggers
    document.querySelectorAll('[data-modal-target]').forEach(button => {
        button.addEventListener('click', () => {
            const modal = document.getElementById(button.getAttribute('data-modal-target'));
            openModal(modal);
        });
    });

    // Close modal when close button is clicked
    document.querySelectorAll('.modal-close').forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal-overlay');
            closeModal(modal);
        });
    });

    // Close modal when clicking outside
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal(overlay);
            }
        });
    });
}

function openModal(modal) {
    if (modal) {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modal) {
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
}

// Alert System
function showAlert(message, type = 'success') {
    const alertBox = document.createElement('div');
    alertBox.className = `alert alert-${type}`;
    alertBox.textContent = message;
    
    document.body.appendChild(alertBox);
    
    setTimeout(() => {
        alertBox.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        alertBox.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(alertBox);
        }, 300);
    }, 3000);
}

// Mock Authentication Functions
function login(email, password, userType) {
    // Simulate API call with setTimeout
    setTimeout(() => {
        // For demo purposes, always succeed
        localStorage.setItem('user', JSON.stringify({
            email,
            userType,
            isLoggedIn: true
        }));
        
        showAlert('Login successful! Redirecting...');
        
        // Redirect based on user type
        setTimeout(() => {
            if (userType === 'student') {
                window.location.href = 'student-dashboard.html';
            } else {
                window.location.href = 'client-dashboard.html';
            }
        }, 1000);
    }, 1000);
}

function register(name, email, password, userType) {
    // Simulate API call with setTimeout
    setTimeout(() => {
        // For demo purposes, always succeed
        localStorage.setItem('user', JSON.stringify({
            name,
            email,
            userType,
            isLoggedIn: true
        }));
        
        showAlert('Registration successful! Redirecting...');
        
        // Redirect based on user type
        setTimeout(() => {
            if (userType === 'student') {
                window.location.href = 'student-dashboard.html';
            } else {
                window.location.href = 'client-dashboard.html';
            }
        }, 1000);
    }, 1000);
}

function logout() {
    localStorage.removeItem('user');
    window.location.href = 'index.html';
}

// Check if user is logged in
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.isLoggedIn) {
        window.location.href = 'login.html';
    }
    return user;
}

// Job Functions
function postJob(title, category, description, budget) {
    // Simulate API call
    setTimeout(() => {
        const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
        const newJob = {
            id: Date.now(),
            title,
            category,
            description,
            budget,
            status: 'open',
            clientId: checkAuth().email,
            candidates: []
        };
        
        jobs.push(newJob);
        localStorage.setItem('jobs', JSON.stringify(jobs));
        
        showAlert('Job posted successfully!');
        
        // Refresh page to show new job
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }, 1000);
}

function acceptJobOffer(jobId) {
    // Simulate API call
    setTimeout(() => {
        const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
        const user = checkAuth();
        
        const jobIndex = jobs.findIndex(job => job.id == jobId);
        
        if (jobIndex !== -1) {
            if (!jobs[jobIndex].candidates.includes(user.email)) {
                jobs[jobIndex].candidates.push(user.email);
                localStorage.setItem('jobs', JSON.stringify(jobs));
                
                showAlert('Job application submitted!');
                
                // Add to student's accepted jobs
                const acceptedJobs = JSON.parse(localStorage.getItem('acceptedJobs')) || [];
                acceptedJobs.push({
                    jobId,
                    studentId: user.email,
                    status: 'pending'
                });
                localStorage.setItem('acceptedJobs', JSON.stringify(acceptedJobs));
                
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            } else {
                showAlert('You have already applied for this job', 'error');
            }
        }
    }, 1000);
}

function approveCandidate(jobId, candidateId) {
    // Simulate API call
    setTimeout(() => {
        const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
        const acceptedJobs = JSON.parse(localStorage.getItem('acceptedJobs')) || [];
        
        const jobIndex = jobs.findIndex(job => job.id == jobId);
        const acceptedJobIndex = acceptedJobs.findIndex(job => job.jobId == jobId && job.studentId == candidateId);
        
        if (jobIndex !== -1 && acceptedJobIndex !== -1) {
            // Update job status
            jobs[jobIndex].status = 'in-progress';
            jobs[jobIndex].assignedTo = candidateId;
            
            // Update accepted job status
            acceptedJobs[acceptedJobIndex].status = 'approved';
            
            localStorage.setItem('jobs', JSON.stringify(jobs));
            localStorage.setItem('acceptedJobs', JSON.stringify(acceptedJobs));
            
            showAlert('Candidate approved successfully!');
            
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }, 1000);
}

function rejectCandidate(jobId, candidateId) {
    // Simulate API call
    setTimeout(() => {
        const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
        const acceptedJobs = JSON.parse(localStorage.getItem('acceptedJobs')) || [];
        
        const jobIndex = jobs.findIndex(job => job.id == jobId);
        const acceptedJobIndex = acceptedJobs.findIndex(job => job.jobId == jobId && job.studentId == candidateId);
        
        if (jobIndex !== -1 && acceptedJobIndex !== -1) {
            // Remove candidate from job
            jobs[jobIndex].candidates = jobs[jobIndex].candidates.filter(candidate => candidate !== candidateId);
            
            // Update accepted job status
            acceptedJobs[acceptedJobIndex].status = 'rejected';
            
            localStorage.setItem('jobs', JSON.stringify(jobs));
            localStorage.setItem('acceptedJobs', JSON.stringify(acceptedJobs));
            
            showAlert('Candidate rejected');
            
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }, 1000);
}

function completeJob(jobId) {
    // Simulate API call
    setTimeout(() => {
        const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
        const acceptedJobs = JSON.parse(localStorage.getItem('acceptedJobs')) || [];
        
        const jobIndex = jobs.findIndex(job => job.id == jobId);
        const acceptedJobIndex = acceptedJobs.findIndex(job => job.jobId == jobId);
        
        if (jobIndex !== -1 && acceptedJobIndex !== -1) {
            // Update job status
            jobs[jobIndex].status = 'completed';
            
            // Update accepted job status
            acceptedJobs[acceptedJobIndex].status = 'completed';
            
            localStorage.setItem('jobs', JSON.stringify(jobs));
            localStorage.setItem('acceptedJobs', JSON.stringify(acceptedJobs));
            
            // Process payment
            const wallets = JSON.parse(localStorage.getItem('wallets')) || {};
            const clientId = jobs[jobIndex].clientId;
            const studentId = jobs[jobIndex].assignedTo;
            const amount = parseFloat(jobs[jobIndex].budget);
            
            if (!wallets[clientId] || wallets[clientId] < amount) {
                showAlert('Insufficient funds to complete payment', 'error');
                return;
            }
            
            // Deduct from client
            wallets[clientId] -= amount;
            
            // Add to student
            wallets[studentId] = (wallets[studentId] || 0) + amount;
            
            localStorage.setItem('wallets', JSON.stringify(wallets));
            
            showAlert('Job marked as complete and payment processed!');
            
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        }
    }, 1000);
}

// Wallet Functions
function depositFunds(amount) {
    // Simulate API call
    setTimeout(() => {
        const user = checkAuth();
        const wallets = JSON.parse(localStorage.getItem('wallets')) || {};
        
        wallets[user.email] = (wallets[user.email] || 0) + amount;
        
        localStorage.setItem('wallets', JSON.stringify(wallets));
        
        showAlert(`Successfully deposited $${amount}`);
        
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }, 1000);
}

function withdrawFunds(amount, bankName, accountNumber) {
    // Simulate API call
    setTimeout(() => {
        const user = checkAuth();
        const wallets = JSON.parse(localStorage.getItem('wallets')) || {};
        
        if (!wallets[user.email] || wallets[user.email] < amount) {
            showAlert('Insufficient funds', 'error');
            return;
        }
        
        wallets[user.email] -= amount;
        
        localStorage.setItem('wallets', JSON.stringify(wallets));
        
        showAlert(`Successfully withdrawn $${amount} to ${bankName} (${accountNumber})`);
        
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }, 1000);
}

// File Upload Functions
function handleFileUpload(event, type) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Validate file
    if (type === 'resume' && file.type !== 'application/pdf') {
        showAlert('Please upload a PDF file', 'error');
        return;
    }
    
    if (type === 'work-samples' && !file.type.startsWith('image/')) {
        showAlert('Please upload an image file', 'error');
        return;
    }
    
    // Simulate file upload
    const reader = new FileReader();
    
    reader.onload = function(e) {
        if (type === 'resume') {
            // Store resume in localStorage (for demo purposes)
            localStorage.setItem('resume', JSON.stringify({
                name: file.name,
                type: file.type,
                size: file.size,
                lastModified: file.lastModified
            }));
            
            showAlert('Resume uploaded successfully!');
            
            // Display file name
            const fileNameDisplay = document.getElementById('resume-file-name');
            if (fileNameDisplay) {
                fileNameDisplay.textContent = file.name;
            }
        } else if (type === 'work-samples') {
            // For work samples, display the image
            const workSamplesContainer = document.getElementById('uploaded-work-samples');
            
            if (workSamplesContainer) {
                const fileItem = document.createElement('div');
                fileItem.className = 'file-item';
                
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = file.name;
                
                const overlay = document.createElement('div');
                overlay.className = 'file-item-overlay';
                
                const removeBtn = document.createElement('button');
                removeBtn.className = 'file-remove';
                removeBtn.innerHTML = '<i class="fas fa-trash"></i>';
                removeBtn.onclick = function() {
                    workSamplesContainer.removeChild(fileItem);
                };
                
                overlay.appendChild(removeBtn);
                fileItem.appendChild(img);
                fileItem.appendChild(overlay);
                
                workSamplesContainer.appendChild(fileItem);
                
                showAlert('Work sample uploaded');
            }
        }
    };
    
    reader.readAsDataURL(file);
}

// Chat Functions
function sendMessage(message) {
    const user = checkAuth();
    const chatMessages = document.querySelector('.chat-messages');
    
    if (!chatMessages) return;
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = 'message message-sent';
    messageElement.textContent = message;
    
    // Add to chat
    chatMessages.appendChild(messageElement);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Simulate response after a delay
    setTimeout(() => {
        // Create response element
        const responseElement = document.createElement('div');
        responseElement.className = 'message message-received';
        responseElement.textContent = "Thank you for your message. I'll get back to you soon!";
        
        // Add to chat
        chatMessages.appendChild(responseElement);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
}

// Price Negotiation Function
function offerPrice(price) {
    // Get the job ID from URL or data attribute
    const jobId = new URLSearchParams(window.location.search).get('jobId') || 
                document.querySelector('[data-job-id]')?.getAttribute('data-job-id');
    
    if (!jobId) {
        showAlert('Job ID not found', 'error');
        return;
    }
    
    // Simulate API call
    setTimeout(() => {
        const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
        const user = checkAuth();
        
        const jobIndex = jobs.findIndex(job => job.id == jobId);
        
        if (jobIndex !== -1) {
            // Add price offer to job
            jobs[jobIndex].priceOffers = jobs[jobIndex].priceOffers || [];
            jobs[jobIndex].priceOffers.push({
                userId: user.email,
                price,
                status: 'pending'
            });
            
            localStorage.setItem('jobs', JSON.stringify(jobs));
            
            showAlert('Price offer sent!');
            
            setTimeout(() => {
                closeModal(document.querySelector('.modal-overlay.show'));
            }, 1000);
        }
    }, 1000);
}

// Accept Price Offer Function
function acceptPriceOffer(jobId, offerId) {
    // Simulate API call
    setTimeout(() => {
        const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
        
        const jobIndex = jobs.findIndex(job => job.id == jobId);
        
        if (jobIndex !== -1 && jobs[jobIndex].priceOffers) {
            const offerIndex = jobs[jobIndex].priceOffers.findIndex(offer => offer.id == offerId);
            
            if (offerIndex !== -1) {
                // Mark this offer as accepted
                jobs[jobIndex].priceOffers[offerIndex].status = 'accepted';
                
                // Update job budget
                jobs[jobIndex].budget = jobs[jobIndex].priceOffers[offerIndex].price;
                
                // Mark all other offers as rejected
                jobs[jobIndex].priceOffers.forEach((offer, index) => {
                    if (index !== offerIndex) {
                        offer.status = 'rejected';
                    }
                });
                
                localStorage.setItem('jobs', JSON.stringify(jobs));
                
                showAlert('Price offer accepted!');
                
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
        }
    }, 1000);
} 