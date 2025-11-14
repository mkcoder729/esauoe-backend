        // Header scroll effect
        window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

                // Continuous looping without deletion
        document.addEventListener('DOMContentLoaded', function() {
            const subtitleElement = document.getElementById('typing-subtitle');
            const fullText = "Welcome to The University of Eldoret - Where Knowledge Meets Innovation. Join our community of future engineers shaping tomorrow's world through technology, creativity, and collaboration.";

            function typeWriter() {
                let charIndex = 0;
                let currentText = '';
                const typingSpeed = 40;
                const pauseAtCommas = 200;
                const pauseAtPeriods = 400;

                function type() {
                    if (charIndex < fullText.length) {
                        const currentChar = fullText.charAt(charIndex);
                        currentText += currentChar;
                        subtitleElement.innerHTML = currentText + '<span class="typing-cursor"></span>';

                        charIndex++;

                        let speed = typingSpeed;
                        if (currentChar === ',') speed += pauseAtCommas;
                        if (currentChar === '.') speed += pauseAtPeriods;

                        setTimeout(type, speed);
                    } else {
                        // Reset and start over
                        charIndex = 0;
                        currentText = '';
                        setTimeout(type, 1000); // Pause before restart
                    }
                }

                // Start typing
                type();
            }

            // Start the loop
            setTimeout(typeWriter, 1000);
        });






        // 3D Orbital Navigation
        const navTrigger = document.getElementById('navTrigger');
        const orbitalMenu = document.getElementById('orbitalMenu');
        const orbitalItems = document.querySelectorAll('.orbital-item');

        navTrigger.addEventListener('click', function() {
            this.classList.toggle('active');
            orbitalMenu.classList.toggle('active');

            // Animate orbital items with delay
            orbitalItems.forEach((item, index) => {
                if (orbitalMenu.classList.contains('active')) {
                    item.style.opacity = '1';
                    item.style.transition = `all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.1}s`;
                } else {
                    item.style.opacity = '0';
                    item.style.transition = `all 0.3s ease ${index * 0.05}s`;
                }
            });
        });

        // Close orbital menu when clicking on a link
        orbitalItems.forEach(item => {
            item.addEventListener('click', function() {
                navTrigger.classList.remove('active');
                orbitalMenu.classList.remove('active');
                orbitalItems.forEach(item => {
                    item.style.opacity = '0';
                });
            });
        });






                    // Logo modal functionality
            document.addEventListener('DOMContentLoaded', function() {
                const logoWrapper = document.querySelector('.logo-image-wrapper');
                const logoModal = document.getElementById('logoModal');
                const logoModalBackdrop = document.getElementById('logoModalBackdrop');
                const logoModalClose = document.getElementById('logoModalClose');

                if (logoWrapper && logoModal) {
                    // Open logo modal
                    logoWrapper.addEventListener('click', function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        logoModal.classList.add('active');
                        document.body.style.overflow = 'hidden'; // Prevent scrolling
                    });

                    // Close logo modal
                    function closeLogoModal() {
                        logoModal.classList.remove('active');
                        document.body.style.overflow = ''; // Restore scrolling
                    }

                    // Close modal events
                    if (logoModalBackdrop) {
                        logoModalBackdrop.addEventListener('click', closeLogoModal);
                    }

                    if (logoModalClose) {
                        logoModalClose.addEventListener('click', closeLogoModal);
                    }

                    // Close modal with Escape key
                    document.addEventListener('keydown', function(e) {
                        if (e.key === 'Escape' && logoModal.classList.contains('active')) {
                            closeLogoModal();
                        }
                    });

                    // Prevent modal content click from closing modal
                    logoModal.addEventListener('click', function(e) {
                        e.stopPropagation();
                    });
                }

                // Logo error handling
                const logoImg = document.querySelector('.logo-img');
                const fallbackIcon = document.querySelector('.fallback-icon');

                if (logoImg && fallbackIcon) {
                    logoImg.addEventListener('error', function() {
                        this.style.display = 'none';
                        fallbackIcon.style.display = 'block';
                        console.log('Logo image failed to load, showing fallback icon');
                    });

                    logoImg.addEventListener('load', function() {
                        console.log('Logo image loaded successfully');
                        fallbackIcon.style.display = 'none';
                    });
                }
            });







        // counting animation - restarts on every page visit
        function startCountAnimation() {
            const statNumbers = document.querySelectorAll('.stat-number-mega');
            const statsSection = document.querySelector('.about-stats-mega');

            // Reset all numbers to 0 first
            statNumbers.forEach(stat => {
                const suffix = stat.textContent.includes('+') ? '+' : '';
                stat.setAttribute('data-target', stat.textContent);
                stat.textContent = '0' + suffix;
            });

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        statNumbers.forEach((stat, index) => {
                            const target = parseInt(stat.getAttribute('data-target'));
                            const suffix = stat.textContent.includes('+') ? '+' : '';
                            let current = 0;
                            const duration = 2200;
                            const startTime = performance.now();
                            const delay = index * 200; // Stagger the animations

                            setTimeout(() => {
                                function animateCount(currentTime) {
                                    const elapsed = currentTime - startTime - delay;
                                    const progress = Math.min(elapsed / duration, 1);

                                    // Custom smooth easing
                                    const easeOut = 1 - Math.pow(1 - progress, 3);

                                    current = target * easeOut;

                                    if (progress < 1) {
                                        stat.textContent = Math.floor(current) + suffix;
                                        requestAnimationFrame(animateCount);
                                    } else {
                                        stat.textContent = target + suffix;
                                    }
                                }

                                requestAnimationFrame(animateCount);
                            }, delay);
                        });
                    }
                });
            }, { threshold: 0.3 });

            if (statsSection) {
                observer.observe(statsSection);
            }
        }

        // Start counting animation when page loads - will work on every visit
        document.addEventListener('DOMContentLoaded', startCountAnimation);

        // Also restart when user comes back to the page (optional)
        document.addEventListener('visibilitychange', function() {
            if (!document.hidden) {
                // Page is visible again - you could restart animation here if needed
            }
        });







        // Department full page modals functionality
        document.addEventListener('DOMContentLoaded', function() {
            const exploreBtns = document.querySelectorAll('.explore-btn');
            const closeBtns = document.querySelectorAll('.modal-close');
            const backdrop = document.querySelectorAll('.modal-backdrop');
            const contactModalClose = document.querySelector('.contact-modal-close');
            const contactModalBackdrop = document.querySelector('.contact-modal-backdrop');
            const contactOptions = document.querySelectorAll('.contact-option');

            // Initialize all functionality
            initModals();
            initFAQ();
            initSmoothScrolling();
            initDepartmentStyles();

            // Open modal when clicking Explore Department
            exploreBtns.forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    const department = this.getAttribute('data-department');
                    const modal = document.getElementById(`${department}Modal`);

                    if (modal) {
                        openModal(modal);
                    }
                });
            });

            // Close modal functionality
            function closeAllModals() {
                document.querySelectorAll('.department-full-modal').forEach(modal => {
                    closeModal(modal);
                });
                closeContactModal();
            }

            // Close with X button
            closeBtns.forEach(btn => {
                btn.addEventListener('click', closeAllModals);
            });

            // Close with backdrop click
            backdrop.forEach(backdrop => {
                backdrop.addEventListener('click', closeAllModals);
            });

            // Close contact modal
            contactModalClose.addEventListener('click', closeContactModal);
            contactModalBackdrop.addEventListener('click', closeContactModal);

            // Contact options selection
            contactOptions.forEach(option => {
                option.addEventListener('click', function() {
                    const method = this.getAttribute('data-method');
                    const currentDepartment = this.closest('.contact-options-modal').getAttribute('data-department');
                    handleContactMethod(method, currentDepartment);
                });
            });

            // Close with Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeAllModals();
                    closeContactModal();
                }
            });

            // Handle download brochure buttons
            const downloadButtons = document.querySelectorAll('.download-brochure');
            downloadButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    const department = this.getAttribute('data-department');
                    downloadBrochure(department);
                });
            });

            // Handle contact department buttons
            const contactButtons = document.querySelectorAll('.contact-department');
            contactButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    const department = this.getAttribute('data-department');
                    openContactModal(department);
                });
            });

            // Initialize image preloading
            window.addEventListener('load', preloadModalImages);
        });

        // Enhanced modal functions
        function initModals() {
            // Focus trap for accessibility
            document.querySelectorAll('.department-full-modal').forEach(modal => {
                modal.addEventListener('keydown', function(e) {
                    if (e.key === 'Tab' && this.classList.contains('active')) {
                        trapFocus(this, e);
                    }
                });
            });
        }

        function openModal(modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            document.body.classList.add('modal-open');

            // Animate modal content
            animateModalContent(modal);

            // Lazy load content if needed
            lazyLoadModalContent(modal);

            console.log(`Modal opened: ${modal.id}`);
        }

        function closeModal(modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            document.body.classList.remove('modal-open');

            // Reset scroll position
            const modalBody = modal.querySelector('.modal-body');
            if (modalBody) {
                modalBody.scrollTop = 0;
            }

            // Close all FAQs in this modal
            const faqAnswers = modal.querySelectorAll('.faq-answer');
            const faqIcons = modal.querySelectorAll('.faq-question i');
            const faqQuestions = modal.querySelectorAll('.faq-question');

            faqAnswers.forEach(answer => {
                answer.classList.remove('active');
                answer.style.display = 'none';
            });

            faqIcons.forEach(icon => {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            });

            faqQuestions.forEach(question => {
                question.classList.remove('active');
            });

            console.log(`Modal closed: ${modal.id}`);
        }

        function trapFocus(modal, e) {
            const focusableElements = modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        }

        function animateModalContent(modal) {
            const sections = modal.querySelectorAll('.modal-section');
            const focusItems = modal.querySelectorAll('.focus-item');
            const careerItems = modal.querySelectorAll('.career-item');
            const facultyItems = modal.querySelectorAll('.faculty-item');
            const projectItems = modal.querySelectorAll('.project-item');

            // Reset animations
            sections.forEach(section => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(20px)';
            });

            focusItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-20px)';
            });

            careerItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(10px)';
            });

            facultyItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(10px)';
            });

            projectItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(10px)';
            });

            // Animate sections with staggered delay
            sections.forEach((section, index) => {
                setTimeout(() => {
                    section.style.transition = 'all 0.5s ease';
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 100 + (index * 100));
            });

            // Animate focus items
            focusItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transition = 'all 0.4s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, 300 + (index * 50));
            });

            // Animate career items
            careerItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transition = 'all 0.4s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 400 + (index * 75));
            });

            // Animate faculty items
            facultyItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transition = 'all 0.4s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 500 + (index * 75));
            });

            // Animate project items
            projectItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.transition = 'all 0.4s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 600 + (index * 75));
            });
        }

        function initFAQ() {
            const faqQuestions = document.querySelectorAll('.faq-question');

            faqQuestions.forEach(question => {
                question.addEventListener('click', function() {
                    const answer = this.nextElementSibling;
                    const icon = this.querySelector('i');
                    const isActive = answer.classList.contains('active');

                    // Close all other FAQ answers in the same modal
                    const modal = this.closest('.department-full-modal');
                    const allAnswersInModal = modal.querySelectorAll('.faq-answer');
                    const allIconsInModal = modal.querySelectorAll('.faq-question i');
                    const allQuestionsInModal = modal.querySelectorAll('.faq-question');

                    allAnswersInModal.forEach(ans => {
                        if (ans !== answer) {
                            ans.classList.remove('active');
                            ans.style.display = 'none';
                        }
                    });

                    allIconsInModal.forEach(icn => {
                        if (icn !== icon) {
                            icn.classList.remove('fa-chevron-up');
                            icn.classList.add('fa-chevron-down');
                        }
                    });

                    allQuestionsInModal.forEach(q => {
                        if (q !== this) {
                            q.classList.remove('active');
                        }
                    });

                    if (!isActive) {
                        // Open this FAQ
                        answer.classList.add('active');
                        answer.style.display = 'block';
                        icon.classList.remove('fa-chevron-down');
                        icon.classList.add('fa-chevron-up');
                        this.classList.add('active');
                    } else {
                        // Close this FAQ
                        answer.classList.remove('active');
                        answer.style.display = 'none';
                        icon.classList.remove('fa-chevron-up');
                        icon.classList.add('fa-chevron-down');
                        this.classList.remove('active');
                    }
                });
            });

            // Auto-open first FAQ in each modal when it opens
            document.querySelectorAll('.department-full-modal').forEach(modal => {
                const firstFAQ = modal.querySelector('.faq-question');
                if (firstFAQ) {
                    // Use MutationObserver to detect when modal becomes active
                    const observer = new MutationObserver(function(mutations) {
                        mutations.forEach(function(mutation) {
                            if (mutation.attributeName === 'class') {
                                if (modal.classList.contains('active')) {
                                    setTimeout(() => {
                                        if (!firstFAQ.classList.contains('active')) {
                                            firstFAQ.click();
                                        }
                                    }, 800);
                                }
                            }
                        });
                    });

                    observer.observe(modal, { attributes: true });
                }
            });
        }

        function initSmoothScrolling() {
            // Smooth scrolling for modal content
            const modalBodies = document.querySelectorAll('.modal-body');

            modalBodies.forEach(body => {
                body.addEventListener('wheel', function(e) {
                    // Prevent horizontal scrolling
                    if (e.deltaY === 0) return;

                    e.preventDefault();
                    this.scrollTop += e.deltaY;
                }, { passive: false });
            });
        }

        function initDepartmentStyles() {
            // Add department-specific classes to modals for color coordination
            const modals = {
                'civilModal': 'civil-department',
                'mechanicalModal': 'mechanical-department',
                'electricalModal': 'electrical-department',
                'agriculturalModal': 'agricultural-department'
            };

            Object.keys(modals).forEach(modalId => {
                const modal = document.getElementById(modalId);
                if (modal) {
                    modal.classList.add(modals[modalId]);
                }
            });

            // Add hover effects to partner logos
            const partnerLogos = document.querySelectorAll('.partner-logo');
            partnerLogos.forEach(logo => {
                logo.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-3px) scale(1.05)';
                });

                logo.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });

            // Add interactive effects to course tags
            const courseTags = document.querySelectorAll('.course-tag');
            courseTags.forEach(tag => {
                tag.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-2px) scale(1.05)';
                });

                tag.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                });
            });
        }

        // PDF Download functionality
        function downloadBrochure(department) {
            const modal = document.getElementById(`${department}Modal`);
            const departmentName = modal.querySelector('.modal-title h2').textContent;

            // Show loading state
            const downloadBtn = modal.querySelector('.download-brochure');
            const originalText = downloadBtn.textContent;
            downloadBtn.textContent = 'Generating PDF...';
            downloadBtn.disabled = true;

            // Use html2canvas and jsPDF to generate PDF
            if (typeof html2canvas !== 'undefined' && typeof jsPDF !== 'undefined') {
                // Capture the modal content
                html2canvas(modal.querySelector('.modal-content'), {
                    scale: 2,
                    useCORS: true,
                    logging: false
                }).then(canvas => {
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF('p', 'mm', 'a4');
                    const imgWidth = 210; // A4 width in mm
                    const pageHeight = 295; // A4 height in mm
                    const imgHeight = canvas.height * imgWidth / canvas.width;
                    let heightLeft = imgHeight;
                    let position = 0;

                    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;

                    while (heightLeft >= 0) {
                        position = heightLeft - imgHeight;
                        pdf.addPage();
                        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                        heightLeft -= pageHeight;
                    }

                    // Save the PDF
                    pdf.save(`${departmentName.replace(/\s+/g, '_')}_Brochure.pdf`);

                    // Reset button
                    downloadBtn.textContent = originalText;
                    downloadBtn.disabled = false;
                }).catch(error => {
                    console.error('Error generating PDF:', error);
                    downloadBtn.textContent = originalText;
                    downloadBtn.disabled = false;
                    alert('Error generating PDF. Please try again.');
                });
            } else {
                // Fallback: Show alert and reset button
                setTimeout(() => {
                    alert(`PDF brochure for ${departmentName} would be downloaded. In a real implementation, this would generate a PDF file.`);
                    downloadBtn.textContent = originalText;
                    downloadBtn.disabled = false;
                }, 1000);
            }
        }

        // Contact Modal functionality
        function openContactModal(department) {
            const contactModal = document.getElementById('contactOptionsModal');
            contactModal.setAttribute('data-department', department);
            contactModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeContactModal() {
            const contactModal = document.getElementById('contactOptionsModal');
            contactModal.classList.remove('active');
            document.body.style.overflow = '';
        }

        function handleContactMethod(method, department) {
            const departmentData = {
                'civil': {
                    name: 'Civil & Structural Engineering',
                    email: 'esauoe@uoeld.ac.ke',
                    phone: '+254725336590',
                    whatsapp: '+254725336590'
                },
                'mechanical': {
                    name: 'Mechanical & Production Engineering',
                    email: 'esauoe@uoeld.ac.ke',
                    phone: '+254722670288',
                    whatsapp: '+254722670288'
                },
                'electrical': {
                    name: 'Electrical Engineering',
                    email: 'esauoe@uoeld.ac.ke',
                    phone: '+254722235223',
                    whatsapp: '+254722235223'
                },
                'agricultural': {
                    name: 'Agricultural & Biosystems Engineering',
                    email: 'esauoe@uoeld.ac.ke',
                    phone: '+254727968495',
                    whatsapp: '+254727968495'
                }
            };

            const dept = departmentData[department];

            if (!dept) {
                alert('Department information not found.');
                return;
            }

            switch(method) {
                case 'email':
                    window.location.href = `mailto:${dept.email}?subject=Inquiry about ${encodeURIComponent(dept.name)}`;
                    break;
                case 'whatsapp':
                    window.open(`https://wa.me/${dept.whatsapp}?text=Hello, I would like to inquire about the ${encodeURIComponent(dept.name)} program.`, '_blank');
                    break;
                case 'phone':
                    window.location.href = `tel:${dept.phone}`;
                    break;
            }

            closeContactModal();
        }

        function preloadModalImages() {
            const modalImages = [
                'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                'https://images.unsplash.com/photo-1558618666-fcd25856cd7d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                'https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80'
            ];

            modalImages.forEach(src => {
                const img = new Image();
                img.src = src;
            });
        }

        function lazyLoadModalContent(modal) {
            const images = modal.querySelectorAll('img[data-src]');

            images.forEach(img => {
                if (img.getAttribute('data-src')) {
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                }
            });
        }

        // Enhanced error handling
        window.addEventListener('error', function(e) {
            console.error('Modal error:', e.error);
        });

        // Export functions for global access
        window.ModalManager = {
            openModal,
            closeModal,
            initModals,
            initFAQ
        };

        // Add html2canvas and jsPDF libraries dynamically if not present
        if (typeof html2canvas === 'undefined') {
            const html2canvasScript = document.createElement('script');
            html2canvasScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
            document.head.appendChild(html2canvasScript);
        }

        if (typeof jsPDF === 'undefined') {
            const jsPDFScript = document.createElement('script');
            jsPDFScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
            document.head.appendChild(jsPDFScript);
        }






                // Events Section and Registration Modal Functionality
        document.addEventListener('DOMContentLoaded', function() {
            // Event data mapping
            const eventData = {
                'Engineering Hike to Chepkit': {
                    date: 'September 13, 2025',
                    location: 'Chepkit Mountains',
                    image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
                },
                'Engineering Tournament': {
                    date: 'September 15-19, 2025',
                    location: 'Newsite/Pavilion Grounds',
                    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
                },
                'Tree Planting Day': {
                    date: 'October 10, 2025',
                    location: 'University Campus',
                    image: 'https://images.unsplash.com/photo-1570804439979-801c3bd39577?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
                },
                'Engineering Mentorship Program': {
                    date: 'October 24, 2025',
                    location: 'Engineering Building',
                    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
                },
                'Technology Expo': {
                    date: 'November 7, 2025',
                    location: 'Main Campus Grounds',
                    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
                }
            };

            // Elements
            const registerButtons = document.querySelectorAll('.register-btn');
            const registrationModal = document.getElementById('eventRegistrationModal');
            const modalClose = registrationModal.querySelector('.modal-close');
            const modalBackdrop = registrationModal.querySelector('.modal-backdrop');
            const cancelButton = document.getElementById('cancelRegistration');
            const registrationForm = document.getElementById('registrationForm');
            const modalEventTitle = document.getElementById('modalEventTitle');
            const modalEventName = document.getElementById('modalEventName');
            const modalEventDate = document.getElementById('modalEventDate');
            const modalEventLocation = document.getElementById('modalEventLocation');
            const modalEventImage = document.getElementById('modalEventImage');

            let currentEvent = '';

            // Open registration modal
            registerButtons.forEach(button => {
                button.addEventListener('click', function() {
                    currentEvent = this.getAttribute('data-event');
                    openRegistrationModal(currentEvent);
                });
            });

            function openRegistrationModal(eventName) {
                const event = eventData[eventName];

                if (event) {
                    modalEventTitle.textContent = `Register for ${eventName}`;
                    modalEventName.textContent = eventName;
                    modalEventDate.textContent = event.date;
                    modalEventLocation.textContent = event.location;
                    modalEventImage.src = event.image;
                    modalEventImage.alt = eventName;

                    registrationModal.classList.add('active');
                    document.body.style.overflow = 'hidden';

                    // Reset form
                    registrationForm.reset();
                }
            }

            // Close registration modal
            function closeRegistrationModal() {
                registrationModal.classList.remove('active');
                document.body.style.overflow = '';
            }

            modalClose.addEventListener('click', closeRegistrationModal);
            modalBackdrop.addEventListener('click', closeRegistrationModal);
            cancelButton.addEventListener('click', closeRegistrationModal);

            // Handle form submission
            registrationForm.addEventListener('submit', function(e) {
                e.preventDefault();

                // Get form data
                const formData = new FormData(this);
                const registrationData = {
                    event: currentEvent,
                    fullName: formData.get('fullName'),
                    admissionNumber: formData.get('admissionNumber'),
                    email: formData.get('email'),
                    phone: formData.get('phone'),
                    department: formData.get('department'),
                    yearOfStudy: formData.get('yearOfStudy'),
                    specialRequirements: formData.get('specialRequirements'),
                    timestamp: new Date().toISOString()
                };

                // Validate form
                if (validateForm(registrationData)) {
                    submitRegistration(registrationData);
                }
            });

            // Form validation
            function validateForm(data) {
                const errors = [];

                if (!data.fullName.trim()) {
                    errors.push('Full name is required');
                }

                if (!data.admissionNumber.trim()) {
                    errors.push('Admission number is required');
                }

                if (!data.email.trim() || !isValidEmail(data.email)) {
                    errors.push('Valid email address is required');
                }

                if (!data.phone.trim() || !isValidPhone(data.phone)) {
                    errors.push('Valid phone number is required');
                }

                if (!data.department) {
                    errors.push('Department is required');
                }

                if (!data.yearOfStudy) {
                    errors.push('Year of study is required');
                }

                if (errors.length > 0) {
                    showFormErrors(errors);
                    return false;
                }

                return true;
            }

            function isValidEmail(email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            }

            function isValidPhone(phone) {
                const phoneRegex = /^[+]?[\d\s\-()]{10,}$/;
                return phoneRegex.test(phone);
            }

            function showFormErrors(errors) {
                // Remove existing error messages
                const existingErrors = document.querySelectorAll('.error-message');
                existingErrors.forEach(error => error.remove());

                // Add new error messages
                errors.forEach(error => {
                    const errorElement = document.createElement('div');
                    errorElement.className = 'error-message';
                    errorElement.style.cssText = `
                        background: #e74c3c;
                        color: white;
                        padding: 12px 15px;
                        border-radius: 8px;
                        margin: 10px 0;
                        font-size: 0.9rem;
                        animation: slideIn 0.3s ease;
                    `;
                    errorElement.textContent = error;

                    registrationForm.insertBefore(errorElement, registrationForm.firstChild);
                });

                // Auto-remove errors after 5 seconds
                setTimeout(() => {
                    const errors = document.querySelectorAll('.error-message');
                    errors.forEach(error => {
                        error.style.animation = 'slideOut 0.3s ease forwards';
                        setTimeout(() => error.remove(), 300);
                    });
                }, 5000);
            }

            // Submit registration
            function submitRegistration(data) {
                const submitButton = document.getElementById('submitRegistration');
                const originalText = submitButton.innerHTML;

                // Show loading state
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                submitButton.disabled = true;

                // Simulate API call
                setTimeout(() => {
                    // In a real application, you would send data to your server here
                    console.log('Registration submitted:', data);

                    // Show success message
                    showSuccessMessage(data);

                    // Reset button
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;

                    // Close modal after success
                    setTimeout(closeRegistrationModal, 2000);

                }, 2000);
            }

            function showSuccessMessage(data) {
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: #27ae60;
                    color: white;
                    padding: 30px;
                    border-radius: 15px;
                    text-align: center;
                    z-index: 10030;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    animation: popIn 0.5s ease;
                `;

                successMessage.innerHTML = `
                    <div style="font-size: 3rem; margin-bottom: 15px;">🎉</div>
                    <h3 style="margin: 0 0 10px 0; color: white;">Registration Successful!</h3>
                    <p style="margin: 0; opacity: 0.9;">Thank you, ${data.fullName}!<br>You have successfully registered for ${data.event}.</p>
                    <p style="margin: 15px 0 0 0; font-size: 0.9rem; opacity: 0.8;">A confirmation email will be sent to ${data.email}</p>
                `;

                document.body.appendChild(successMessage);

                // Remove success message after 3 seconds
                setTimeout(() => {
                    successMessage.style.animation = 'popOut 0.5s ease forwards';
                    setTimeout(() => {
                        if (successMessage.parentNode) {
                            successMessage.parentNode.removeChild(successMessage);
                        }
                    }, 500);
                }, 3000);
            }

            // Add CSS animations
            const style = document.createElement('style');
            style.textContent = `
                @keyframes slideIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                @keyframes slideOut {
                    to { opacity: 0; transform: translateY(-10px); }
                }

                @keyframes popIn {
                    from { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
                    to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                }

                @keyframes popOut {
                    to { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
                }

                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }
            `;
            document.head.appendChild(style);

            // Keyboard accessibility
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && registrationModal.classList.contains('active')) {
                    closeRegistrationModal();
                }
            });

            console.log('Events section and registration modal initialized');
        });







                document.addEventListener('DOMContentLoaded', function() {
            const contactForm = document.getElementById('contactForm');
            const successMessage = document.getElementById('successMessage');
            const userNameSpan = document.getElementById('userName');
            const sendAnotherBtn = document.getElementById('sendAnother');

            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();

                // Get the user's name from the form
                const name = document.getElementById('name').value;

                // Display the success message with the user's name
                userNameSpan.textContent = name;

                // Hide the form and show the success message
                contactForm.style.display = 'none';
                successMessage.classList.add('active');
            });

            // Reset the form when "Send Another Message" is clicked
            sendAnotherBtn.addEventListener('click', function() {
                contactForm.reset();
                contactForm.style.display = 'block';
                successMessage.classList.remove('active');
            });
        });








        // Gallery Section with Load More and Modal Functionality
        document.addEventListener('DOMContentLoaded', function() {
            // Gallery data
            const galleryData = [
                {
                    id: 1,
                    category: 'events',
                    image: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    title: 'Annual General Meeting',
                    description: '2023 AGM with special guests from industry',
                    date: 'March 15, 2023'
                },
                {
                    id: 2,
                    category: 'projects',
                    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    title: 'Innovation Expo',
                    description: 'Student projects showcase 2023',
                    date: 'April 22, 2023'
                },
                {
                    id: 3,
                    category: 'workshops',
                    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    title: 'Technical Workshop',
                    description: 'Hands-on session with industry tools',
                    date: 'May 8, 2023'
                },
                {
                    id: 4,
                    category: 'events',
                    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    title: 'Guest Lecture',
                    description: 'Industry expert sharing insights',
                    date: 'June 12, 2023'
                },
                {
                    id: 5,
                    category: 'projects',
                    image: 'https://images.unsplash.com/photo-1558618666-fcd25856cd7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    title: 'Laboratory Session',
                    description: 'Practical experiments in progress',
                    date: 'July 5, 2023'
                },
                {
                    id: 6,
                    category: 'workshops',
                    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    title: 'Hackathon 2023',
                    description: '48-hour coding marathon',
                    date: 'August 18, 2023'
                },
                {
                    id: 7,
                    category: 'campus',
                    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    title: 'Campus Tour',
                    description: 'New students orientation 2023',
                    date: 'September 2, 2023'
                },
                {
                    id: 8,
                    category: 'events',
                    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    title: 'Engineering Career Fair',
                    description: 'Connecting students with employers',
                    date: 'September 25, 2023'
                },
                {
                    id: 9,
                    category: 'projects',
                    image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    title: 'Robotics Competition',
                    description: 'Annual robotics design challenge',
                    date: 'October 10, 2023'
                },
                {
                    id: 10,
                    category: 'workshops',
                    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    title: '3D Printing Workshop',
                    description: 'Advanced manufacturing techniques',
                    date: 'October 28, 2023'
                },
                {
                    id: 11,
                    category: 'campus',
                    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    title: 'Engineering Sports Day',
                    description: 'Inter-department sports competition',
                    date: 'November 5, 2023'
                },
                {
                    id: 12,
                    category: 'events',
                    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    title: 'Awards Ceremony',
                    description: 'Recognizing outstanding achievements',
                    date: 'November 20, 2023'
                },
                {
                    id: 13,
                    category: 'projects',
                    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    title: 'Bridge Design Project',
                    description: 'Civil engineering students showcase',
                    date: 'December 3, 2023'
                },
                {
                    id: 14,
                    category: 'workshops',
                    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    title: 'Circuit Design Workshop',
                    description: 'Electronic circuit prototyping',
                    date: 'December 15, 2023'
                },
                {
                    id: 15,
                    category: 'campus',
                    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    title: 'Study Session',
                    description: 'Group study in engineering library',
                    date: 'January 8, 2024'
                },
                {
                    id: 16,
                    category: 'events',
                    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    title: 'Industry Visit',
                    description: 'Field trip to manufacturing plant',
                    date: 'January 22, 2024'
                },
                {
                    id: 17,
                    category: 'projects',
                    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    title: 'Solar Project',
                    description: 'Renewable energy installation',
                    date: 'February 5, 2024'
                },
                {
                    id: 18,
                    category: 'workshops',
                    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    title: 'AI & Machine Learning',
                    description: 'Introduction to artificial intelligence',
                    date: 'February 18, 2024'
                }
            ];

            // Additional photos for load more
            const additionalPhotos = [
                {
                    id: 19,
                    category: 'campus',
                    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    title: 'Graduation Ceremony',
                    description: 'Engineering graduates celebration',
                    date: 'March 1, 2024'
                },
                {
                    id: 20,
                    category: 'events',
                    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    title: 'Research Symposium',
                    description: 'Presenting engineering research findings',
                    date: 'March 15, 2024'
                },
                {
                    id: 21,
                    category: 'projects',
                    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    title: 'Water Purification System',
                    description: 'Environmental engineering project',
                    date: 'March 28, 2024'
                },
                {
                    id: 22,
                    category: 'workshops',
                    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    title: 'CAD Training',
                    description: 'Computer-aided design workshop',
                    date: 'April 5, 2024'
                },
                {
                    id: 23,
                    category: 'campus',
                    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    title: 'Engineering Club Meeting',
                    description: 'Weekly student club gathering',
                    date: 'April 12, 2024'
                },
                {
                    id: 24,
                    category: 'events',
                    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    title: 'Alumni Reunion',
                    description: 'Engineering alumni networking event',
                    date: 'April 20, 2024'
                },
                {
                    id: 25,
                    category: 'projects',
                    image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    title: 'Smart Agriculture',
                    description: 'IoT-based farming solution',
                    date: 'April 25, 2024'
                },
                {
                    id: 26,
                    category: 'workshops',
                    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
                    title: 'Renewable Energy Workshop',
                    description: 'Sustainable energy solutions',
                    date: 'May 2, 2024'
                }
            ];

            // Elements
            const galleryGrid = document.getElementById('galleryGrid');
            const loadMoreBtn = document.getElementById('loadMoreBtn');
            const shownCount = document.getElementById('shownCount');
            const totalCount = document.getElementById('totalCount');
            const filterBtns = document.querySelectorAll('.filter-btn');
            const photoModal = document.getElementById('photoModal');
            const modalClose = photoModal.querySelector('.modal-close');
            const modalBackdrop = photoModal.querySelector('.modal-backdrop');
            const modalImage = document.getElementById('modalImage');
            const modalTitle = document.getElementById('modalTitle');
            const modalDescription = document.getElementById('modalDescription');
            const modalDate = document.getElementById('modalDate');
            const modalCategory = document.getElementById('modalCategory');
            const prevBtn = document.getElementById('prevPhoto');
            const nextBtn = document.getElementById('nextPhoto');

            // State
            let currentFilter = 'all';
            let visiblePhotos = 6;
            let allPhotos = [...galleryData, ...additionalPhotos];
            let currentPhotoIndex = 0;
            let filteredPhotos = [];

            // Initialize
            function initGallery() {
                updatePhotoCounts();
                setupEventListeners();
                applyFilter('all');
            }

            function updatePhotoCounts() {
                shownCount.textContent = visiblePhotos;
                totalCount.textContent = allPhotos.length;
            }

            function setupEventListeners() {
                // Filter buttons
                filterBtns.forEach(btn => {
                    btn.addEventListener('click', function() {
                        const filter = this.getAttribute('data-filter');
                        setActiveFilter(this);
                        applyFilter(filter);
                    });
                });

                // Load more button
                loadMoreBtn.addEventListener('click', loadMorePhotos);

                // Modal events
                modalClose.addEventListener('click', closeModal);
                modalBackdrop.addEventListener('click', closeModal);
                prevBtn.addEventListener('click', showPreviousPhoto);
                nextBtn.addEventListener('click', showNextPhoto);

                // Keyboard navigation
                document.addEventListener('keydown', handleKeyboardNavigation);
            }

            function setActiveFilter(activeBtn) {
                filterBtns.forEach(btn => btn.classList.remove('active'));
                activeBtn.classList.add('active');
            }

            function applyFilter(filter) {
                currentFilter = filter;
                visiblePhotos = 6; // Reset to initial count when filter changes

                if (filter === 'all') {
                    filteredPhotos = allPhotos;
                } else {
                    filteredPhotos = allPhotos.filter(photo => photo.category === filter);
                }

                renderGallery();
                updatePhotoCounts();
                updateLoadMoreButton();
            }

            function renderGallery() {
                galleryGrid.innerHTML = '';

                const photosToShow = filteredPhotos.slice(0, visiblePhotos);

                photosToShow.forEach((photo, index) => {
                    const galleryItem = createGalleryItem(photo, index);
                    galleryGrid.appendChild(galleryItem);
                });

                // Animate items
                setTimeout(() => {
                    const items = galleryGrid.querySelectorAll('.gallery-item-mega');
                    items.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, index * 100);
                    });
                }, 100);
            }

            function createGalleryItem(photo, index) {
                const item = document.createElement('div');
                item.className = 'gallery-item-mega';
                item.setAttribute('data-category', photo.category);
                item.setAttribute('data-index', index);

                item.innerHTML = `
                    <img src="${photo.image}" alt="${photo.title}" loading="lazy">
                    <div class="gallery-overlay-mega">
                        <i class="fas fa-${getCategoryIcon(photo.category)}"></i>
                        <h3>${photo.title}</h3>
                        <p>${photo.description}</p>
                        <span class="photo-date">${photo.date}</span>
                    </div>
                `;

                item.addEventListener('click', () => openModal(photo, index));
                return item;
            }

            function getCategoryIcon(category) {
                const icons = {
                    'events': 'users',
                    'projects': 'rocket',
                    'workshops': 'tools',
                    'campus': 'university'
                };
                return icons[category] || 'image';
            }

            function loadMorePhotos() {
                loadMoreBtn.classList.add('loading');

                setTimeout(() => {
                    visiblePhotos += 6;

                    if (visiblePhotos >= filteredPhotos.length) {
                        visiblePhotos = filteredPhotos.length;
                        loadMoreBtn.style.display = 'none';
                    }

                    renderGallery();
                    updatePhotoCounts();
                    loadMoreBtn.classList.remove('loading');
                }, 800);
            }

            function updateLoadMoreButton() {
                if (visiblePhotos >= filteredPhotos.length) {
                    loadMoreBtn.style.display = 'none';
                } else {
                    loadMoreBtn.style.display = 'block';
                }
            }

            // Modal functions
            function openModal(photo, index) {
                currentPhotoIndex = index;
                updateModalContent(photo);
                photoModal.classList.add('active');
                document.body.style.overflow = 'hidden';
                updateNavigationButtons();
            }

            function closeModal() {
                photoModal.classList.remove('active');
                document.body.style.overflow = '';
            }

            function updateModalContent(photo) {
                modalImage.src = photo.image;
                modalImage.alt = photo.title;
                modalTitle.textContent = photo.title;
                modalDescription.textContent = photo.description;
                modalDate.textContent = photo.date;
                modalCategory.textContent = getCategoryName(photo.category);
            }

            function getCategoryName(category) {
                const names = {
                    'events': 'Event',
                    'projects': 'Project',
                    'workshops': 'Workshop',
                    'campus': 'Campus Life'
                };
                return names[category] || 'Photo';
            }

            function showPreviousPhoto() {
                if (currentPhotoIndex > 0) {
                    currentPhotoIndex--;
                    const photo = filteredPhotos[currentPhotoIndex];
                    updateModalContent(photo);
                    updateNavigationButtons();
                }
            }

            function showNextPhoto() {
                if (currentPhotoIndex < filteredPhotos.length - 1) {
                    currentPhotoIndex++;
                    const photo = filteredPhotos[currentPhotoIndex];
                    updateModalContent(photo);
                    updateNavigationButtons();
                }
            }

            function updateNavigationButtons() {
                prevBtn.disabled = currentPhotoIndex === 0;
                nextBtn.disabled = currentPhotoIndex === filteredPhotos.length - 1;
            }

            function handleKeyboardNavigation(e) {
                if (!photoModal.classList.contains('active')) return;

                switch(e.key) {
                    case 'ArrowLeft':
                        showPreviousPhoto();
                        break;
                    case 'ArrowRight':
                        showNextPhoto();
                        break;
                    case 'Escape':
                        closeModal();
                        break;
                }
            }

            // Initialize the gallery
            initGallery();
            console.log('Gallery section initialized with', allPhotos.length, 'photos');
        });






                // Tab functionality for courses section
                const tabBtns = document.querySelectorAll('.tab-btn-mega');

                tabBtns.forEach(btn => {
                    btn.addEventListener('click', function() {
                        // Remove active class from all buttons
                        tabBtns.forEach(b => b.classList.remove('active'));

                        // Add active class to clicked button
                        this.classList.add('active');

                        // Here you would typically show/hide content based on the tab
                        // For this example, we'll just log the tab name
                        console.log('Switched to tab:', this.getAttribute('data-tab'));
                    });
                });





                    // Courses Section Tab Functionality
            document.addEventListener('DOMContentLoaded', function() {
                // Elements
                const tabBtns = document.querySelectorAll('.tab-btn-mega');
                const courseGrids = document.querySelectorAll('.courses-grid-mega');

                // Initialize tabs
                function initCourseTabs() {
                    // Hide all course grids except the first one
                    courseGrids.forEach((grid, index) => {
                        if (index === 0) {
                            grid.classList.add('active');
                            animateTabContent(grid);
                        } else {
                            grid.classList.remove('active');
                        }
                    });

                    // Add event listeners to tab buttons
                    tabBtns.forEach(btn => {
                        btn.addEventListener('click', function() {
                            const targetTab = this.getAttribute('data-tab');
                            switchTab(targetTab, this);
                        });
                    });

                    // Add keyboard navigation
                    addKeyboardNavigation();

                    // Add enhanced interactions
                    enhanceCourseCards();
                }

                function switchTab(tabName, clickedBtn) {
                    // Remove active class from all buttons
                    tabBtns.forEach(btn => btn.classList.remove('active'));

                    // Add active class to clicked button
                    clickedBtn.classList.add('active');

                    // Hide all grids
                    courseGrids.forEach(grid => {
                        grid.classList.remove('active');
                    });

                    // Show the target tab content
                    const targetGrid = document.getElementById(tabName);
                    if (targetGrid) {
                        setTimeout(() => {
                            targetGrid.classList.add('active');
                            animateTabContent(targetGrid);
                        }, 50);
                    }
                }

                function animateTabContent(grid) {
                    const cards = grid.querySelectorAll('.course-card-mega');

                    // Reset animation state
                    cards.forEach(card => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(30px)';
                    });

                    // Animate cards in sequence
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 150);
                    });
                }

                function enhanceCourseCards() {
                    const courseCards = document.querySelectorAll('.course-card-mega');

                    courseCards.forEach(card => {
                        // Add click effect
                        card.addEventListener('click', function(e) {
                            if (e.target.tagName !== 'A' && !e.target.closest('a')) {
                                this.style.transform = 'scale(0.98)';
                                setTimeout(() => {
                                    this.style.transform = '';
                                }, 150);
                            }
                        });

                        // Enhanced hover effects
                        card.addEventListener('mouseenter', function() {
                            this.style.transform = 'translateY(-10px) scale(1.02)';
                            this.style.boxShadow = '0 20px 40px rgba(139, 69, 19, 0.3)';
                        });

                        card.addEventListener('mouseleave', function() {
                            if (!this.classList.contains('active')) {
                                this.style.transform = '';
                                this.style.boxShadow = '';
                            }
                        });
                    });
                }

                function addKeyboardNavigation() {
                    document.addEventListener('keydown', function(e) {
                        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                            const activeTab = document.querySelector('.tab-btn-mega.active');
                            if (!activeTab) return;

                            const currentIndex = Array.from(tabBtns).indexOf(activeTab);
                            let nextIndex;

                            if (e.key === 'ArrowRight') {
                                nextIndex = (currentIndex + 1) % tabBtns.length;
                            } else {
                                nextIndex = (currentIndex - 1 + tabBtns.length) % tabBtns.length;
                            }

                            const nextTab = tabBtns[nextIndex];
                            const targetTab = nextTab.getAttribute('data-tab');
                            switchTab(targetTab, nextTab);
                            nextTab.focus();
                        }
                    });

                    // Add focus styles for accessibility
                    tabBtns.forEach(btn => {
                        btn.addEventListener('focus', function() {
                            this.style.outline = '2px solid #8B4513';
                            this.style.outlineOffset = '2px';
                        });

                        btn.addEventListener('blur', function() {
                            this.style.outline = 'none';
                        });
                    });
                }

                // Initialize everything
                function initCoursesSection() {
                    initCourseTabs();
                    console.log('Courses section initialized with tab functionality');
                }

                // Start the courses section
                initCoursesSection();
            });







            // Academic Resources Section Functionality
            document.addEventListener('DOMContentLoaded', function() {
                // Sample documents data with file URLs
                const sampleDocuments = [
                    {
                        id: 1,
                        title: "Structural Analysis Lecture Notes",
                        department: "civil",
                        year: "3",
                        category: "notes",
                        course: "Structural Analysis",
                        description: "Comprehensive lecture notes covering beam analysis, trusses, and frame structures.",
                        downloads: 245,
                        uploadDate: "2024-01-15",
                        fileType: "pdf",
                        approved: true,
                        fileUrl: "documents/structural-analysis-notes.pdf"
                    },
                    {
                        id: 2,
                        title: "Thermodynamics Past Papers 2023",
                        department: "mechanical",
                        year: "2",
                        category: "papers",
                        course: "Thermodynamics",
                        description: "Collection of past examination papers with detailed solutions and marking schemes.",
                        downloads: 189,
                        uploadDate: "2024-01-10",
                        fileType: "pdf",
                        approved: true,
                        fileUrl: "thermodynamics.pdf"
                    },
                    {
                        id: 3,
                        title: "Electrical Circuits Lab Manual",
                        department: "electrical",
                        year: "1",
                        category: "manuals",
                        course: "Electrical Circuits",
                        description: "Complete laboratory manual with experiment procedures and safety guidelines.",
                        downloads: 156,
                        uploadDate: "2024-01-08",
                        fileType: "doc",
                        approved: true,
                        fileUrl: "documents/electrical-circuits-lab-manual.docx"
                    },
                    {
                        id: 4,
                        title: "Soil Mechanics Project Report",
                        department: "civil",
                        year: "4",
                        category: "projects",
                        course: "Soil Mechanics",
                        description: "Detailed project report on soil testing and foundation design analysis.",
                        downloads: 98,
                        uploadDate: "2024-01-05",
                        fileType: "pdf",
                        approved: true,
                        fileUrl: "documents/soil-mechanics-project-report.pdf"
                    },
                    {
                        id: 5,
                        title: "Power Systems Tutorial Solutions",
                        department: "electrical",
                        year: "3",
                        category: "tutorials",
                        course: "Power Systems",
                        description: "Step-by-step solutions to tutorial problems with detailed explanations.",
                        downloads: 134,
                        uploadDate: "2024-01-03",
                        fileType: "pdf",
                        approved: true,
                        fileUrl: "documents/power-systems-tutorial-solutions.pdf"
                    },
                    {
                        id: 6,
                        title: "Farm Machinery Design Textbook",
                        department: "agricultural",
                        year: "4",
                        category: "books",
                        course: "Farm Machinery",
                        description: "Comprehensive textbook covering agricultural equipment design principles.",
                        downloads: 76,
                        uploadDate: "2024-01-01",
                        fileType: "pdf",
                        approved: true,
                        fileUrl: "documents/farm-machinery-design-textbook.pdf"
                    },
                    {
                        id: 7,
                        title: "Fluid Mechanics Lecture Slides",
                        department: "mechanical",
                        year: "2",
                        category: "notes",
                        course: "Fluid Mechanics",
                        description: "Complete set of lecture slides covering fluid dynamics and hydraulics.",
                        downloads: 210,
                        uploadDate: "2024-01-18",
                        fileType: "pdf",
                        approved: true,
                        fileUrl: "documents/fluid-mechanics-lecture-slides.pdf"
                    },
                    {
                        id: 8,
                        title: "Digital Electronics Past Papers",
                        department: "electrical",
                        year: "2",
                        category: "papers",
                        course: "Digital Electronics",
                        description: "Past examination papers with solutions for digital electronics course.",
                        downloads: 145,
                        uploadDate: "2024-01-12",
                        fileType: "pdf",
                        approved: true,
                        fileUrl: "documents/digital-electronics-past-papers.pdf"
                    },
                    {
                        id: 9,
                        title: "Concrete Technology Lab Guide",
                        department: "civil",
                        year: "3",
                        category: "manuals",
                        course: "Concrete Technology",
                        description: "Laboratory manual for concrete testing and quality control procedures.",
                        downloads: 88,
                        uploadDate: "2024-01-09",
                        fileType: "pdf",
                        approved: true,
                        fileUrl: "documents/concrete-technology-lab-guide.pdf"
                    },
                    {
                        id: 10,
                        title: "Renewable Energy Systems Project",
                        department: "electrical",
                        year: "4",
                        category: "projects",
                        course: "Renewable Energy",
                        description: "Comprehensive project report on solar and wind energy integration.",
                        downloads: 112,
                        uploadDate: "2024-01-07",
                        fileType: "pdf",
                        approved: true,
                        fileUrl: "documents/renewable-energy-systems-project.pdf"
                    },
                    {
                        id: 11,
                        title: "Mathematics Tutorial Problems",
                        department: "civil",
                        year: "1",
                        category: "tutorials",
                        course: "Engineering Mathematics",
                        description: "Solved tutorial problems covering calculus and differential equations.",
                        downloads: 198,
                        uploadDate: "2024-01-14",
                        fileType: "pdf",
                        approved: true,
                        fileUrl: "documents/mathematics-tutorial-problems.pdf"
                    },
                    {
                        id: 12,
                        title: "Heat Transfer Textbook",
                        department: "mechanical",
                        year: "3",
                        category: "books",
                        course: "Heat Transfer",
                        description: "Complete textbook covering conduction, convection, and radiation principles.",
                        downloads: 167,
                        uploadDate: "2024-01-11",
                        fileType: "pdf",
                        approved: true,
                        fileUrl: "documents/heat-transfer-textbook.pdf"
                    },
                    {
                        id: 13,
                        title: "Irrigation Engineering Notes",
                        department: "agricultural",
                        year: "3",
                        category: "notes",
                        course: "Irrigation Engineering",
                        description: "Detailed notes on irrigation systems design and water management.",
                        downloads: 92,
                        uploadDate: "2024-01-06",
                        fileType: "pdf",
                        approved: true,
                        fileUrl: "documents/irrigation-engineering-notes.pdf"
                    },
                    {
                        id: 14,
                        title: "Control Systems Past Exams",
                        department: "electrical",
                        year: "4",
                        category: "papers",
                        course: "Control Systems",
                        description: "Collection of past final exams with model answers for control systems.",
                        downloads: 123,
                        uploadDate: "2024-01-04",
                        fileType: "pdf",
                        approved: true,
                        fileUrl: "documents/control-systems-past-exams.pdf"
                    },
                    {
                        id: 15,
                        title: "Soil Testing Laboratory Manual",
                        department: "agricultural",
                        year: "2",
                        category: "manuals",
                        course: "Soil Science",
                        description: "Complete guide to soil sampling and laboratory testing procedures.",
                        downloads: 67,
                        uploadDate: "2024-01-02",
                        fileType: "pdf",
                        approved: true,
                        fileUrl: "documents/soil-testing-laboratory-manual.pdf"
                    },
                    {
                        id: 16,
                        title: "Machine Design Project Portfolio",
                        department: "mechanical",
                        year: "4",
                        category: "projects",
                        course: "Machine Design",
                        description: "Complete design portfolio for mechanical components and systems.",
                        downloads: 154,
                        uploadDate: "2023-12-28",
                        fileType: "pdf",
                        approved: true,
                        fileUrl: "documents/machine-design-project-portfolio.pdf"
                    }
                ];

                // Elements
                const resourcesGrid = document.getElementById('resourcesGrid');
                const uploadBtn = document.getElementById('uploadBtn');
                const uploadModal = document.getElementById('uploadModal');
                const closeUploadModal = document.getElementById('closeUploadModal');
                const cancelUpload = document.getElementById('cancelUpload');
                const modalBackdrop = document.querySelector('.modal-backdrop-mega');
                const uploadForm = document.getElementById('uploadForm');
                const documentFile = document.getElementById('documentFile');
                const fileName = document.getElementById('fileName');
                const searchInput = document.getElementById('resourceSearch');
                const searchBtn = document.getElementById('searchBtn');
                const departmentFilter = document.getElementById('departmentFilter');
                const yearFilter = document.getElementById('yearFilter');
                const categoryFilter = document.getElementById('categoryFilter');
                const loadMoreBtn = document.getElementById('loadMoreResources');

                // State
                let currentDocuments = [...sampleDocuments];
                let visibleCount = 8;
                let filteredDocuments = [...sampleDocuments];
                let hasAnimatedStats = false; // Track if stats have been animated

                // Initialize
                function initAcademicResources() {
                    renderDocuments();
                    setupEventListeners();

                    // Reset stats to 0 initially
                    resetStatsToZero();

                    // Set up intersection observer to trigger animation when section is visible
                    setupIntersectionObserver();
                }

                function setupIntersectionObserver() {
                    const observer = new IntersectionObserver((entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting && !hasAnimatedStats) {
                                // Section is visible and stats haven't been animated yet
                                setTimeout(() => {
                                    updateStats();
                                    hasAnimatedStats = true;
                                }, 300);
                            } else if (!entry.isIntersecting) {
                                // Section is not visible - reset animation state
                                hasAnimatedStats = false;
                                resetStatsToZero();
                            }
                        });
                    }, {
                        threshold: 0.3, // Trigger when 30% of section is visible
                        rootMargin: '0px 0px -100px 0px' // Small offset to trigger slightly earlier
                    });

                    const academicSection = document.getElementById('academic');
                    if (academicSection) {
                        observer.observe(academicSection);
                    }
                }

                function resetStatsToZero() {
                    const totalDocuments = document.getElementById('totalDocuments');
                    const activeUsers = document.getElementById('activeUsers');
                    const totalDownloads = document.getElementById('totalDownloads');

                    if (totalDocuments) totalDocuments.textContent = '0';
                    if (activeUsers) activeUsers.textContent = '0';
                    if (totalDownloads) totalDownloads.textContent = '0';
                }

                function setupEventListeners() {
                    // Upload modal
                    uploadBtn.addEventListener('click', openUploadModal);
                    closeUploadModal.addEventListener('click', closeModal);
                    cancelUpload.addEventListener('click', closeModal);
                    modalBackdrop.addEventListener('click', closeModal);

                    // File upload
                    documentFile.addEventListener('change', handleFileSelect);

                    // Form submission
                    uploadForm.addEventListener('submit', handleFormSubmit);

                    // Search and filters
                    searchInput.addEventListener('input', handleSearch);
                    searchBtn.addEventListener('click', handleSearch);
                    departmentFilter.addEventListener('change', applyFilters);
                    yearFilter.addEventListener('change', applyFilters);
                    categoryFilter.addEventListener('change', applyFilters);

                    // Load more
                    loadMoreBtn.addEventListener('click', loadMoreDocuments);

                    // Keyboard events
                    document.addEventListener('keydown', handleKeyboard);
                }

                function renderDocuments() {
                    resourcesGrid.innerHTML = '';

                    const documentsToShow = filteredDocuments.slice(0, visibleCount);

                    if (documentsToShow.length === 0) {
                        resourcesGrid.innerHTML = `
                            <div class="no-results-mega">
                                <i class="fas fa-search"></i>
                                <h3>No documents found</h3>
                                <p>Try adjusting your search criteria or filters</p>
                            </div>
                        `;
                        return;
                    }

                    documentsToShow.forEach(doc => {
                        const card = createDocumentCard(doc);
                        resourcesGrid.appendChild(card);
                    });

                    updateLoadMoreButton();
                }

                function createDocumentCard(doc) {
                    const card = document.createElement('div');
                    card.className = 'resource-card-mega';

                    const departmentNames = {
                        'civil': 'Civil Engineering',
                        'mechanical': 'Mechanical Engineering',
                        'electrical': 'Electrical Engineering',
                        'agricultural': 'Agricultural Engineering'
                    };

                    const categoryIcons = {
                        'notes': 'fas fa-book',
                        'papers': 'fas fa-file-pdf',
                        'manuals': 'fas fa-vial',
                        'projects': 'fas fa-project-diagram',
                        'tutorials': 'fas fa-chalkboard-teacher',
                        'books': 'fas fa-book-open'
                    };

                    card.innerHTML = `
                        <div class="resource-header-mega">
                            <div class="resource-icon-mega">
                                <i class="${categoryIcons[doc.category]}"></i>
                            </div>
                            <span class="resource-badge-mega">${doc.fileType.toUpperCase()}</span>
                        </div>
                        <h3>${doc.title}</h3>
                        <div class="resource-meta-mega">
                            <span><i class="fas fa-building"></i> ${departmentNames[doc.department]}</span>
                            <span><i class="fas fa-calendar"></i> Year ${doc.year}</span>
                            <span><i class="fas fa-download"></i> ${doc.downloads}</span>
                        </div>
                        <p>${doc.description}</p>
                        <div class="resource-actions-mega">
                            <button class="btn-download-mega" onclick="downloadDocument(${doc.id})">
                                <i class="fas fa-download"></i>
                                Download
                            </button>
                            <button class="btn-preview-mega" onclick="previewDocument(${doc.id})">
                                <i class="fas fa-eye"></i>
                                Preview
                            </button>
                        </div>
                    `;

                    return card;
                }

                function openUploadModal() {
                    uploadModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }

                function closeModal() {
                    uploadModal.classList.remove('active');
                    document.body.style.overflow = '';
                    uploadForm.reset();
                    fileName.textContent = 'No file chosen';
                }

                function handleFileSelect(event) {
                    const file = event.target.files[0];
                    if (file) {
                        fileName.textContent = file.name;
                    }
                }

                function handleFormSubmit(event) {
                    event.preventDefault();

                    const formData = {
                        name: document.getElementById('uploaderName').value,
                        email: document.getElementById('uploaderEmail').value,
                        title: document.getElementById('documentTitle').value,
                        department: document.getElementById('documentDepartment').value,
                        year: document.getElementById('documentYear').value,
                        category: document.getElementById('documentCategory').value,
                        course: document.getElementById('documentCourse').value,
                        description: document.getElementById('documentDescription').value,
                        file: document.getElementById('documentFile').files[0]
                    };

                    // Submit form with email functionality
                    submitDocumentForApproval(formData);
                }

                function submitDocumentForApproval(formData) {
                    const submitBtn = uploadForm.querySelector('button[type="submit"]');
                    const originalText = submitBtn.innerHTML;

                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
                    submitBtn.disabled = true;

                    // Simulate API call delay
                    setTimeout(() => {
                        // Send email to admin
                        sendAdminEmail(formData);

                        // Send confirmation email to uploader
                        sendUploaderConfirmation(formData);

                        // Add document to pending approval list
                        addPendingDocument(formData);

                        // Show success message
                        showNotification('Document submitted for admin approval! You will receive an email confirmation shortly.', 'success');

                        // Close modal and reset form
                        closeModal();
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;

                        // Update stats
                        updateStats();

                    }, 2000);
                }

                function sendAdminEmail(formData) {
                    const adminEmail = 'lemanuel7neuro@gmail.com';
                    const subject = `New Document Submission: ${formData.title}`;
                    const body = `
                        New document submission for approval:

                        Document Details:
                        - Title: ${formData.title}
                        - Uploader: ${formData.name}
                        - Email: ${formData.email}
                        - Department: ${formData.department}
                        - Year: ${formData.year}
                        - Category: ${formData.category}
                        - Course: ${formData.course}
                        - Description: ${formData.description}

                        Please review and approve this document.

                        Approve: [APPROVE_LINK_HERE]
                        Reject: [REJECT_LINK_HERE]
                    `;

                    // In a real application, you would use a service like EmailJS, SendGrid, or your backend
                    console.log(`Sending email to ${adminEmail}`);
                    console.log(`Subject: ${subject}`);
                    console.log(`Body: ${body}`);

                    // For demo purposes, we'll simulate the email sending
                    // In production, integrate with your email service
                    simulateEmailSending(adminEmail, subject, body);
                }

                function sendUploaderConfirmation(formData) {
                    const userEmail = formData.email;
                    const subject = `Document Submission Confirmation: ${formData.title}`;
                    const body = `
                        Dear ${formData.name},

                        Thank you for submitting your document "${formData.title}" to our Academic Resources Hub.

                        Your document has been received and is currently under review by our admin team. You will be notified once it's approved and published on the platform.

                        Document Details:
                        - Title: ${formData.title}
                        - Department: ${formData.department}
                        - Year: ${formData.year}
                        - Category: ${formData.category}
                        - Course: ${formData.course}

                        If you have any questions, please contact our support team.

                        Best regards,
                        Academic Resources Team
                    `;

                    console.log(`Sending confirmation email to ${userEmail}`);
                    console.log(`Subject: ${subject}`);
                    console.log(`Body: ${body}`);

                    simulateEmailSending(userEmail, subject, body);
                }

                function simulateEmailSending(to, subject, body) {
                    // In a real application, this would be an actual email service integration
                    console.log(`[EMAIL SIMULATION] To: ${to}`);
                    console.log(`[EMAIL SIMULATION] Subject: ${subject}`);
                    console.log(`[EMAIL SIMULATION] Body: ${body}`);
                    console.log('[EMAIL SIMULATION] Email sent successfully!');
                }

                function addPendingDocument(formData) {
                    // In a real application, this would be saved to your database
                    const pendingDocument = {
                        id: Date.now(), // Temporary ID
                        title: formData.title,
                        department: formData.department,
                        year: formData.year,
                        category: formData.category,
                        course: formData.course,
                        description: formData.description,
                        uploadDate: new Date().toISOString().split('T')[0],
                        fileType: formData.file ? formData.file.name.split('.').pop() : 'pdf',
                        approved: false,
                        downloads: 0,
                        uploaderName: formData.name,
                        uploaderEmail: formData.email,
                        fileUrl: null // Will be set after approval and file upload
                    };

                    console.log('Pending document added:', pendingDocument);

                    // Update total documents count (this would increment in a real database)
                    // For demo, we'll just log it
                    console.log('Total documents count should be incremented by 1');
                }

                function handleSearch() {
                    applyFilters();
                }

                function applyFilters() {
                    const searchTerm = searchInput.value.toLowerCase();
                    const department = departmentFilter.value;
                    const year = yearFilter.value;
                    const category = categoryFilter.value;

                    filteredDocuments = currentDocuments.filter(doc => {
                        const matchesSearch = doc.title.toLowerCase().includes(searchTerm) ||
                                            doc.description.toLowerCase().includes(searchTerm) ||
                                            doc.course.toLowerCase().includes(searchTerm);

                        const matchesDepartment = !department || doc.department === department;
                        const matchesYear = !year || doc.year === year;
                        const matchesCategory = !category || doc.category === category;

                        return matchesSearch && matchesDepartment && matchesYear && matchesCategory;
                    });

                    visibleCount = 6;
                    renderDocuments();
                }

            function loadMoreDocuments() {
                const originalText = loadMoreBtn.innerHTML;

                // Show loading state
                loadMoreBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                loadMoreBtn.disabled = true;

                // Simulate loading delay
                setTimeout(() => {
                    visibleCount += 4;
                    renderDocuments();

                    // Restore button state
                    loadMoreBtn.innerHTML = originalText;
                    loadMoreBtn.disabled = false;
                }, 1500); // 1.5 second loading delay
            }

                function updateLoadMoreButton() {
                    if (visibleCount >= filteredDocuments.length) {
                        loadMoreBtn.style.display = 'none';
                    } else {
                        loadMoreBtn.style.display = 'block';
                    }
                }

                function updateStats() {
                    // In a real application, these would come from your backend
                    const totalDocuments = document.getElementById('totalDocuments');
                    const activeUsers = document.getElementById('activeUsers');
                    const totalDownloads = document.getElementById('totalDownloads');

                    // Calculate realistic numbers based on your data
                    const totalDocsCount = currentDocuments.length;
                    const activeUsersCount = 45;  // Students + faculty
                    const totalDownloadsCount = currentDocuments.reduce((sum, doc) => sum + doc.downloads, 0);

                    // Animate numbers with smooth restart
                    animateValue(totalDocuments, 0, totalDocsCount, 1800);
                    setTimeout(() => animateValue(activeUsers, 0, activeUsersCount, 1800), 300);
                    setTimeout(() => animateValue(totalDownloads, 0, totalDownloadsCount, 1800), 600);
                }

                function animateValue(element, start, end, duration) {
                    // Clear any existing animation
                    if (element._animationFrame) {
                        cancelAnimationFrame(element._animationFrame);
                    }

                    let startTimestamp = null;
                    const step = (timestamp) => {
                        if (!startTimestamp) startTimestamp = timestamp;
                        const progress = Math.min((timestamp - startTimestamp) / duration, 1);

                        // Smooth easing function
                        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                        const value = Math.floor(easeOutQuart * (end - start) + start);

                        element.textContent = value.toLocaleString();

                        if (progress < 1) {
                            element._animationFrame = requestAnimationFrame(step);
                        } else {
                            element._animationFrame = null;
                        }
                    };

                    element._animationFrame = requestAnimationFrame(step);
                }

                function handleKeyboard(event) {
                    if (event.key === 'Escape' && uploadModal.classList.contains('active')) {
                        closeModal();
                    }
                }

                // Global functions for document actions
                window.downloadDocument = function(docId) {
                    const doc = currentDocuments.find(d => d.id === docId);
                    if (doc) {
                        // Increment download count
                        doc.downloads++;

                        // Update the document card display
                        const downloadCountElement = document.querySelector(`[onclick="downloadDocument(${docId})"]`).parentElement.parentElement.querySelector('.resource-meta-mega span:nth-child(3)');
                        if (downloadCountElement) {
                            downloadCountElement.innerHTML = `<i class="fas fa-download"></i> ${doc.downloads}`;
                        }

                        // Update total downloads stat
                        updateStats();

                        // Show download notification
                        showNotification(`Downloading: ${doc.title}`, 'info');

                        // Trigger actual download if fileUrl exists
                        if (doc.fileUrl) {
                            // Create a temporary anchor element to trigger download
                            const link = document.createElement('a');
                            link.href = doc.fileUrl;
                            link.download = doc.title + '.' + doc.fileType;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);

                            console.log(`Downloading document: ${doc.title}`);
                            console.log(`File URL: ${doc.fileUrl}`);
                            console.log(`Download count updated to: ${doc.downloads}`);
                        } else {
                            // Fallback to simulated download
                            console.log(`Document download requested: ${doc.title}`);
                            console.log(`File type: ${doc.fileType}`);
                            console.log(`Download count updated to: ${doc.downloads}`);
                            console.log('Note: No file URL available - this is a simulated download');
                        }
                    }
                };

                window.previewDocument = function(docId) {
                    const doc = currentDocuments.find(d => d.id === docId);
                    if (doc && doc.fileUrl) {
                        // Open the file in a new tab for preview
                        window.open(doc.fileUrl, '_blank');
                        showNotification(`Opening preview: ${doc.title}`, 'info');
                    } else {
                        showNotification(`Preview not available for: ${doc.title}`, 'info');
                    }
                };

                function showNotification(message, type) {
                    // Create notification element
                    const notification = document.createElement('div');
                    notification.className = `notification-mega notification-${type}`;
                    notification.innerHTML = `
                        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                        <span>${message}</span>
                    `;

                    document.body.appendChild(notification);

                    // Animate in
                    setTimeout(() => notification.classList.add('show'), 100);

                    // Remove after 4 seconds
                    setTimeout(() => {
                        notification.classList.remove('show');
                        setTimeout(() => {
                            if (notification.parentNode) {
                                notification.parentNode.removeChild(notification);
                            }
                        }, 300);
                    }, 4000);
                }

                // Re-animate stats when page becomes visible again
                document.addEventListener('visibilitychange', function() {
                    if (!document.hidden) {
                        // Page became visible - reset animation state
                        hasAnimatedStats = false;
                        resetStatsToZero();
                    }
                });

                // Initialize the section
                initAcademicResources();
            });







            // Merchandise Section Functionality
            document.addEventListener('DOMContentLoaded', function() {
                // Merchandise Data
                const merchandiseData = [
                    // Clothing Category
                    {
                        id: 1,
                        name: "ESA Official T-Shirt",
                        category: "clothing",
                        price: 1200,
                        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
                        description: "100% cotton official ESA t-shirt with engineering design",
                        badge: "Bestseller",
                        stock: 50
                    },
                    {
                        id: 2,
                        name: "ESA Hoodie",
                        category: "clothing",
                        price: 2500,
                        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
                        description: "Warm and comfortable ESA hoodie for engineering students",
                        badge: "New",
                        stock: 30
                    },
                    {
                        id: 3,
                        name: "ESA Polo Shirt",
                        category: "clothing",
                        price: 1500,
                        image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
                        description: "Professional polo shirt with ESA embroidery",
                        badge: "",
                        stock: 25
                    },

                    // Accessories Category
                    {
                        id: 4,
                        name: "ESA Baseball Cap",
                        category: "accessories",
                        price: 800,
                        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                        description: "Adjustable ESA branded baseball cap",
                        badge: "",
                        stock: 40
                    },
                    {
                        id: 5,
                        name: "ESA Ceramic Mug",
                        category: "accessories",
                        price: 600,
                        image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1972&q=80",
                        description: "High-quality ceramic mug with ESA logo",
                        badge: "",
                        stock: 60
                    },
                    {
                        id: 6,
                        name: "ESA Laptop Sleeve",
                        category: "accessories",
                        price: 1800,
                        image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                        description: "Protective laptop sleeve for 13-15 inch laptops",
                        badge: "Popular",
                        stock: 20
                    },

                    // Engineering Tools Category
                    {
                        id: 7,
                        name: "Engineering Calculator",
                        category: "instruments",
                        price: 3500,
                        image: "https://images.unsplash.com/photo-1587145820266-a5951ee6f620?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80",
                        description: "Scientific calculator for engineering calculations",
                        badge: "Essential",
                        stock: 15
                    },
                    {
                        id: 8,
                        name: "Digital Caliper",
                        category: "instruments",
                        price: 4500,
                        image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                        description: "Precision digital caliper for measurements",
                        badge: "",
                        stock: 12
                    },
                    {
                        id: 9,
                        name: "Multimeter",
                        category: "instruments",
                        price: 2800,
                        image: "https://images.unsplash.com/photo-1603732551681-2e91159b9dc2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                        description: "Digital multimeter for electrical measurements",
                        badge: "Bestseller",
                        stock: 18
                    },
                    {
                        id: 10,
                        name: "Drawing Kit",
                        category: "instruments",
                        price: 2200,
                        image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                        description: "Complete engineering drawing kit with tools",
                        badge: "",
                        stock: 25
                    },

                    // Stationery Category
                    {
                        id: 11,
                        name: "Engineering Notebook",
                        category: "stationery",
                        price: 800,
                        image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2098&q=80",
                        description: "Grid-lined notebook for engineering notes",
                        badge: "",
                        stock: 100
                    },
                    {
                        id: 12,
                        name: "Technical Pen Set",
                        category: "stationery",
                        price: 1200,
                        image: "https://images.unsplash.com/photo-1581093458791-8a6a5d8345f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                        description: "Set of technical drawing pens",
                        badge: "",
                        stock: 35
                    },
                    {
                        id: 13,
                        name: "ESA Sticker Pack",
                        category: "stationery",
                        price: 300,
                        image: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                        description: "Pack of ESA branded stickers",
                        badge: "New",
                        stock: 200
                    },

                    // Safety Gear Category
                    {
                        id: 14,
                        name: "Safety Goggles",
                        category: "safety",
                        price: 900,
                        image: "https://images.unsplash.com/photo-1584302179602-e4819bb92daa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                        description: "Protective safety goggles for lab work",
                        badge: "Essential",
                        stock: 45
                    },
                    {
                        id: 15,
                        name: "Lab Coat",
                        category: "safety",
                        price: 1800,
                        image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                        description: "White lab coat for laboratory sessions",
                        badge: "",
                        stock: 30
                    },
                    {
                        id: 16,
                        name: "Safety Gloves",
                        category: "safety",
                        price: 600,
                        image: "https://images.unsplash.com/photo-1584432810602-21d5a6580491?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
                        description: "Protective gloves for engineering labs",
                        badge: "",
                        stock: 80
                    }
                ];

                // Elements
                const merchGrid = document.getElementById('merchGrid');
                const cartSummary = document.getElementById('cartSummary');
                const cartCount = document.getElementById('cartCount');
                const cartTotal = document.getElementById('cartTotal');
                const checkoutBtn = document.getElementById('checkoutBtn');
                const categoryBtns = document.querySelectorAll('.category-btn-mega');
                const cartModal = document.getElementById('cartModal');
                const closeCartModal = document.getElementById('closeCartModal');
                const continueShopping = document.getElementById('continueShopping');
                const proceedToPay = document.getElementById('proceedToPay');
                const cartItems = document.getElementById('cartItems');
                const cartEmpty = document.getElementById('cartEmpty');
                const subtotalAmount = document.getElementById('subtotalAmount');
                const deliveryAmount = document.getElementById('deliveryAmount');
                const grandTotalAmount = document.getElementById('grandTotalAmount');
                const paymentModal = document.getElementById('paymentModal');
                const closePaymentModal = document.getElementById('closePaymentModal');
                const backToCart = document.getElementById('backToCart');
                const confirmPayment = document.getElementById('confirmPayment');
                const paymentAmount = document.getElementById('paymentAmount');
                const paymentSummary = document.getElementById('paymentSummary');
                const successModal = document.getElementById('successModal');
                const closeSuccessModal = document.getElementById('closeSuccessModal');
                const newOrder = document.getElementById('newOrder');
                const paidAmount = document.getElementById('paidAmount');
                const orderNumber = document.getElementById('orderNumber');
                const transactionDate = document.getElementById('transactionDate');

                // State
                let cart = [];
                let currentCategory = 'all';
                const deliveryFee = 200;
                const mpesaTill = '3438080';
                let paymentCountdownInterval = null;

                // Initialize
                function initMerchandise() {
                    renderMerchandise();
                    setupEventListeners();
                    updateCartSummary();
                }

                function setupEventListeners() {
                    // Category filters
                    categoryBtns.forEach(btn => {
                        btn.addEventListener('click', function() {
                            const category = this.getAttribute('data-category');
                            setActiveCategory(this, category);
                        });
                    });

                    // Cart modal
                    checkoutBtn.addEventListener('click', openCartModal);
                    closeCartModal.addEventListener('click', closeCartModalFunc);
                    continueShopping.addEventListener('click', closeCartModalFunc);

                    // Payment flow
                    proceedToPay.addEventListener('click', openPaymentModal);
                    backToCart.addEventListener('click', backToCartFunc);
                    confirmPayment.addEventListener('click', processPayment);
                    closePaymentModal.addEventListener('click', closePaymentModalFunc);

                    // Success modal
                    closeSuccessModal.addEventListener('click', printReceipt);
                    newOrder.addEventListener('click', startNewOrder);

                    // Close modals on backdrop click
                    document.querySelectorAll('.modal-backdrop-mega').forEach(backdrop => {
                        backdrop.addEventListener('click', function() {
                            closeAllModals();
                        });
                    });

                    // Keyboard events
                    document.addEventListener('keydown', handleKeyboard);
                }

                function setActiveCategory(clickedBtn, category) {
                    categoryBtns.forEach(btn => btn.classList.remove('active'));
                    clickedBtn.classList.add('active');
                    currentCategory = category;
                    renderMerchandise();
                }

                function renderMerchandise() {
                    merchGrid.innerHTML = '';

                    const filteredItems = currentCategory === 'all'
                        ? merchandiseData
                        : merchandiseData.filter(item => item.category === currentCategory);

                    filteredItems.forEach(item => {
                        const merchItem = createMerchItem(item);
                        merchGrid.appendChild(merchItem);
                    });
                }

                function createMerchItem(item) {
                    const itemElement = document.createElement('div');
                    itemElement.className = 'merch-item-mega';

                    const cartItem = cart.find(cartItem => cartItem.id === item.id);
                    const quantity = cartItem ? cartItem.quantity : 0;
                    const isInStock = item.stock > 0;

                    itemElement.innerHTML = `
                        <div class="merch-image-mega">
                            <img src="${item.image}" alt="${item.name}">
                            ${item.badge ? `<div class="merch-badge">${item.badge}</div>` : ''}
                        </div>
                        <div class="merch-info-mega">
                            <h3>${item.name}</h3>
                            <p class="merch-description-mega">${item.description}</p>
                            <div class="merch-meta-mega">
                                <span class="merch-category-mega">${getCategoryName(item.category)}</span>
                                <span class="merch-stock-mega ${isInStock ? 'in-stock' : 'low-stock'}">
                                    ${isInStock ? `${item.stock} in stock` : 'Out of stock'}
                                </span>
                            </div>
                            <div class="merch-price-mega">KSh ${item.price.toLocaleString()}</div>
                            <div class="merch-actions-mega">
                                ${quantity > 0 ? `
                                    <button class="btn-quantity-mega" onclick="decreaseQuantity(${item.id})">-</button>
                                    <span class="quantity-display-mega">${quantity}</span>
                                    <button class="btn-quantity-mega" onclick="increaseQuantity(${item.id})" ${!isInStock ? 'disabled' : ''}>+</button>
                                ` : `
                                    <button class="btn-add-cart-mega" onclick="addToCart(${item.id})" ${!isInStock ? 'disabled' : ''}>
                                        <i class="fas fa-shopping-cart"></i> Add to Cart
                                    </button>
                                `}
                            </div>
                        </div>
                    `;

                    return itemElement;
                }

                function getCategoryName(category) {
                    const categories = {
                        'clothing': 'Clothing',
                        'accessories': 'Accessories',
                        'instruments': 'Tools',
                        'stationery': 'Stationery',
                        'safety': 'Safety Gear'
                    };
                    return categories[category] || category;
                }

                // Cart Functions
                window.addToCart = function(itemId) {
                    const item = merchandiseData.find(i => i.id === itemId);
                    if (!item || item.stock <= 0) return;

                    const existingItem = cart.find(cartItem => cartItem.id === itemId);

                    if (existingItem) {
                        if (existingItem.quantity < item.stock) {
                            existingItem.quantity++;
                        }
                    } else {
                        cart.push({
                            ...item,
                            quantity: 1
                        });
                    }

                    updateCartSummary();
                    renderMerchandise();
                    showNotification(`${item.name} added to cart`, 'success');
                };

                window.increaseQuantity = function(itemId) {
                    const cartItem = cart.find(item => item.id === itemId);
                    const merchandiseItem = merchandiseData.find(item => item.id === itemId);

                    if (cartItem && cartItem.quantity < merchandiseItem.stock) {
                        cartItem.quantity++;
                        updateCartSummary();
                        renderMerchandise();
                    }
                };

                window.decreaseQuantity = function(itemId) {
                    const cartItem = cart.find(item => item.id === itemId);

                    if (cartItem) {
                        if (cartItem.quantity > 1) {
                            cartItem.quantity--;
                        } else {
                            cart = cart.filter(item => item.id !== itemId);
                        }
                        updateCartSummary();
                        renderMerchandise();
                    }
                };

                function removeFromCart(itemId) {
                    cart = cart.filter(item => item.id !== itemId);
                    updateCartSummary();
                    renderMerchandise();
                    updateCartModal();
                    showNotification('Item removed from cart', 'info');
                }

                function updateCartSummary() {
                    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
                    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

                    cartCount.textContent = totalItems;
                    cartTotal.textContent = totalAmount.toLocaleString();

                    checkoutBtn.disabled = totalItems === 0;
                }

                function openCartModal() {
                    updateCartModal();
                    cartModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }

                function closeCartModalFunc() {
                    cartModal.classList.remove('active');
                    document.body.style.overflow = '';
                }

                function updateCartModal() {
                    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                    const grandTotal = totalAmount + deliveryFee;

                    if (cart.length === 0) {
                        cartItems.style.display = 'none';
                        cartEmpty.style.display = 'block';
                        proceedToPay.disabled = true;
                    } else {
                        cartItems.style.display = 'block';
                        cartEmpty.style.display = 'none';
                        proceedToPay.disabled = false;

                        cartItems.innerHTML = cart.map(item => `
                            <div class="cart-item-mega">
                                <div class="cart-item-image-mega">
                                    <img src="${item.image}" alt="${item.name}">
                                </div>
                                <div class="cart-item-details-mega">
                                    <div class="cart-item-name-mega">${item.name}</div>
                                    <div class="cart-item-price-mega">KSh ${item.price.toLocaleString()} × ${item.quantity}</div>
                                </div>
                                <div class="cart-item-controls-mega">
                                    <button class="btn-quantity-mega" onclick="decreaseQuantity(${item.id})">-</button>
                                    <span class="cart-item-quantity-mega">${item.quantity}</span>
                                    <button class="btn-quantity-mega" onclick="increaseQuantity(${item.id})">+</button>
                                    <button class="cart-item-remove-mega" onclick="removeFromCart(${item.id})">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        `).join('');

                        subtotalAmount.textContent = totalAmount.toLocaleString();
                        deliveryAmount.textContent = deliveryFee.toLocaleString();
                        grandTotalAmount.textContent = grandTotal.toLocaleString();
                    }
                }

                function openPaymentModal() {
                    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                    const grandTotal = totalAmount + deliveryFee;

                    paymentAmount.textContent = grandTotal.toLocaleString();

                    // Reset payment modal content to form view
                    resetPaymentModalContent();

                    paymentModal.classList.add('active');
                    cartModal.classList.remove('active');
                }

                function closePaymentModalFunc() {
                    if (paymentCountdownInterval) {
                        clearInterval(paymentCountdownInterval);
                        paymentCountdownInterval = null;
                    }
                    paymentModal.classList.remove('active');
                    document.body.style.overflow = '';
                }

                function backToCartFunc() {
                    if (paymentCountdownInterval) {
                        clearInterval(paymentCountdownInterval);
                        paymentCountdownInterval = null;
                    }
                    paymentModal.classList.remove('active');
                    cartModal.classList.add('active');
                }

                function processPayment() {
                    const phone = document.getElementById('customerPhone').value;
                    const name = document.getElementById('customerName').value;
                    const email = document.getElementById('customerEmail').value;

                    if (!phone || !name || !email) {
                        showModalNotification('Please fill in all required fields', 'error');
                        return;
                    }

                    // Enhanced phone validation for Kenyan numbers
                    const cleanedPhone = phone.replace(/\s/g, '').replace(/\+/g, '');
                    let normalizedPhone;

                    // Check for different phone number formats
                    if (/^07\d{8}$/.test(cleanedPhone)) {
                        // Format: 0712345678 (10 digits starting with 07)
                        normalizedPhone = cleanedPhone;
                    } else if (/^01\d{8}$/.test(cleanedPhone)) {
                        // Format: 0112345678 (10 digits starting with 01)
                        normalizedPhone = cleanedPhone;
                    } else if (/^2547\d{8}$/.test(cleanedPhone)) {
                        // Format: 254712345678 (12 digits starting with 2547)
                        normalizedPhone = '0' + cleanedPhone.substring(3);
                    } else if (/^2541\d{8}$/.test(cleanedPhone)) {
                        // Format: 254112345678 (12 digits starting with 2541)
                        normalizedPhone = '0' + cleanedPhone.substring(3);
                    } else if (/^7\d{8}$/.test(cleanedPhone)) {
                        // Format: 712345678 (9 digits starting with 7)
                        normalizedPhone = '0' + cleanedPhone;
                    } else if (/^1\d{8}$/.test(cleanedPhone)) {
                        // Format: 112345678 (9 digits starting with 1)
                        normalizedPhone = '0' + cleanedPhone;
                    } else if (/^\+254[71]\d{8}$/.test(phone.replace(/\s/g, ''))) {
                        // Format: +254712345678 or +254112345678
                        normalizedPhone = '0' + phone.replace(/\s/g, '').substring(4);
                    } else {
                        showModalNotification(
                            'Please enter a valid Kenyan phone number. Accepted formats:\n' +
                            '• 07xxxxxxxx\n• 01xxxxxxxx\n• 2547xxxxxxxx\n• 2541xxxxxxxx\n• +2547xxxxxxxx\n• +2541xxxxxxxx',
                            'error'
                        );
                        return;
                    }

                    // Final validation of the normalized phone number
                    if (!/^(07|01)\d{8}$/.test(normalizedPhone)) {
                        showModalNotification('Invalid phone number format after conversion', 'error');
                        return;
                    }

                    // Show MPESA simulation with normalized phone number
                    showMPESASimulation(normalizedPhone);
                }

                function showMPESASimulation(phone) {
                    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                    const grandTotal = totalAmount + deliveryFee;

                    // Update payment modal content to show simulation
                    const paymentContent = document.querySelector('.payment-modal-mega .modal-content-mega');
                    paymentContent.innerHTML = `
                        <div class="payment-status">
                            <i class="fas fa-mobile-alt"></i>
                            <h4>MPESA Payment Initiated</h4>
                            <p>We're connecting to MPESA. Please wait...</p>
                        </div>

                        <div class="mpesa-simulation">
                            <h4 style="text-align: center; color: #5D4037; margin-bottom: 20px;">MPESA Simulation</h4>

                            <div class="mpesa-phone">
                                <div style="color: #795548; margin-bottom: 5px;">Sending request to:</div>
                                <div class="phone-number">${phone}</div>
                            </div>

                            <div class="payment-countdown">
                                <div style="color: #795548; margin-bottom: 10px;">Request expires in:</div>
                                <div class="countdown-timer" id="countdownTimer">60</div>
                                <div style="color: #795548; font-size: 0.9rem;">seconds</div>
                            </div>

                            <div class="pin-prompt" id="pinPrompt" style="display: none;">
                                <div style="color: #795548; margin-bottom: 10px;">Enter your MPESA PIN on your phone</div>
                                <div class="pin-input">****</div>
                                <div style="color: #795548; font-size: 0.9rem; margin-top: 10px;">
                                    Amount: KSh ${grandTotal.toLocaleString()}<br>
                                    Till: ${mpesaTill}
                                </div>
                            </div>

                            <div class="payment-steps-mega">
                                <div class="payment-step-mega">
                                    <div class="step-number">1</div>
                                    <div class="step-content">
                                        <h4>Check Your Phone</h4>
                                        <p>Look for the MPESA prompt on your device</p>
                                    </div>
                                </div>
                                <div class="payment-step-mega">
                                    <div class="step-number">2</div>
                                    <div class="step-content">
                                        <h4>Enter PIN</h4>
                                        <p>Enter your MPESA PIN to authorize payment</p>
                                    </div>
                                </div>
                                <div class="payment-step-mega">
                                    <div class="step-number">3</div>
                                    <div class="step-content">
                                        <h4>Confirm Payment</h4>
                                        <p>Wait for payment confirmation</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style="text-align: center; margin-top: 20px;">
                            <button class="btn btn-outline-mega" id="cancelPayment">
                                <i class="fas fa-times"></i> Cancel Payment
                            </button>
                        </div>
                    `;

                    // Add event listener for cancel button
                    document.getElementById('cancelPayment').addEventListener('click', function() {
                        if (paymentCountdownInterval) {
                            clearInterval(paymentCountdownInterval);
                            paymentCountdownInterval = null;
                        }
                        resetPaymentModal();
                        showModalNotification('Payment cancelled', 'info');
                    });

                    // Start the simulation
                    startPaymentSimulation(grandTotal);
                }

                function startPaymentSimulation(amount) {
                    let countdown = 60;
                    const countdownElement = document.getElementById('countdownTimer');
                    const pinPrompt = document.getElementById('pinPrompt');

                    // Start countdown
                    paymentCountdownInterval = setInterval(() => {
                        countdown--;
                        countdownElement.textContent = countdown;

                        if (countdown === 45) {
                            // Show PIN prompt halfway through
                            pinPrompt.style.display = 'block';
                            showModalNotification('MPESA prompt sent to your phone. Enter PIN to complete payment.', 'info');
                        }

                        if (countdown <= 0) {
                            clearInterval(paymentCountdownInterval);
                            paymentCountdownInterval = null;
                            handlePaymentTimeout();
                        }
                    }, 1000);

                    // Simulate successful payment after 15 seconds (if not cancelled)
                    setTimeout(() => {
                        if (paymentCountdownInterval) {
                            clearInterval(paymentCountdownInterval);
                            paymentCountdownInterval = null;
                            completePaymentSimulation(amount);
                        }
                    }, 15000);
                }

                function handlePaymentTimeout() {
                    const paymentContent = document.querySelector('.payment-modal-mega .modal-content-mega');
                    paymentContent.innerHTML = `
                        <div class="payment-status" style="background: rgba(244, 67, 54, 0.1); border-color: #f44336;">
                            <i class="fas fa-exclamation-triangle" style="color: #f44336;"></i>
                            <h4 style="color: #f44336;">Payment Timeout</h4>
                            <p>The payment request has expired. Please try again.</p>
                        </div>

                        <div style="text-align: center; margin-top: 30px;">
                            <button class="btn btn-gold-mega" id="retryPayment">
                                <i class="fas fa-redo"></i> Try Again
                            </button>
                            <button class="btn btn-outline-mega" id="backToPayment">
                                <i class="fas fa-arrow-left"></i> Back to Details
                            </button>
                        </div>
                    `;

                    document.getElementById('retryPayment').addEventListener('click', function() {
                        processPayment();
                    });

                    document.getElementById('backToPayment').addEventListener('click', function() {
                        resetPaymentModal();
                    });
                }

                function completePaymentSimulation(amount) {
                    const paymentContent = document.querySelector('.payment-modal-mega .modal-content-mega');
                    paymentContent.innerHTML = `
                        <div class="payment-status" style="background: rgba(76, 175, 80, 0.1); border-color: #4CAF50;">
                            <i class="fas fa-check-circle" style="color: #4CAF50;"></i>
                            <h4 style="color: #4CAF50;">Payment Successful!</h4>
                            <p>Your payment of KSh ${amount.toLocaleString()} has been processed successfully.</p>
                        </div>

                        <div class="mpesa-simulation" style="border-color: #4CAF50;">
                            <h4 style="text-align: center; color: #4CAF50; margin-bottom: 15px;">MPESA Confirmation</h4>
                            <div style="background: white; border-radius: 10px; padding: 15px; margin: 10px 0;">
                                <div style="color: #795548; font-size: 0.9rem;">You have received KSh ${amount.toLocaleString()}</div>
                                <div style="color: #5D4037; font-weight: 700; margin: 5px 0;">from ESA ENGINEERING STORE</div>
                                <div style="color: #795548; font-size: 0.9rem;">Till No: ${mpesaTill}</div>
                                <div style="color: #795548; font-size: 0.9rem; margin-top: 10px;">${new Date().toLocaleString()}</div>
                            </div>
                        </div>

                        <div style="text-align: center; margin-top: 20px;">
                            <button class="btn btn-gold-mega" id="viewReceipt">
                                <i class="fas fa-receipt"></i> View Receipt & Pickup Details
                            </button>
                        </div>
                    `;

                    document.getElementById('viewReceipt').addEventListener('click', function() {
                        showPaymentSuccess();
                    });
                }

                function resetPaymentModal() {
                    // Close payment modal and reopen with original form
                    paymentModal.classList.remove('active');
                    setTimeout(() => {
                        openPaymentModal();
                    }, 300);
                }

                function resetPaymentModalContent() {
                    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                    const grandTotal = totalAmount + deliveryFee;

                    const paymentContent = document.querySelector('.payment-modal-mega .modal-content-mega');
                    paymentContent.innerHTML = `
                        <div class="payment-instructions-mega">
                            <h4>Payment Instructions</h4>
                            <p>Complete your purchase using MPESA. Follow these steps:</p>

                            <div class="payment-step-mega">
                                <div class="step-number">1</div>
                                <div class="step-content">
                                    <h4>Enter Your Details</h4>
                                    <p>Fill in your contact information below</p>
                                </div>
                            </div>

                            <div class="payment-step-mega">
                                <div class="step-number">2</div>
                                <div class="step-content">
                                    <h4>MPESA Payment</h4>
                                    <p>We'll send a payment request to your phone</p>
                                </div>
                            </div>

                            <div class="payment-step-mega">
                                <div class="step-number">3</div>
                                <div class="step-content">
                                    <h4>Confirm Payment</h4>
                                    <p>Enter your MPESA PIN to complete the transaction</p>
                                </div>
                            </div>
                        </div>

                        <div class="payment-form-mega">
                            <div class="form-group-mega">
                                <label for="customerName">Full Name *</label>
                                <input type="text" id="customerName" placeholder="Enter your full name" required>
                            </div>

                            <div class="form-group-mega">
                                <label for="customerPhone">Phone Number *</label>
                                <input type="tel" id="customerPhone" placeholder="e.g., 0712345678 or 0112345678" required>
                            </div>

                            <div class="form-group-mega">
                                <label for="customerEmail">Email Address *</label>
                                <input type="email" id="customerEmail" placeholder="Enter your email address" required>
                            </div>
                        </div>

                        <div class="payment-summary-mega">
                            <h4>Order Summary</h4>
                            <div id="paymentSummary">
                                ${cart.map(item => `
                                    <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                        <span>${item.name} (${item.quantity})</span>
                                        <span>KSh ${(item.price * item.quantity).toLocaleString()}</span>
                                    </div>
                                `).join('')}
                                <div style="display: flex; justify-content: space-between; margin-top: 10px; padding-top: 10px; border-top: 1px solid #e0e0e0;">
                                    <span>Delivery:</span>
                                    <span>KSh ${deliveryFee.toLocaleString()}</span>
                                </div>
                                <div style="display: flex; justify-content: space-between; margin-top: 10px; padding-top: 10px; border-top: 1px solid #e0e0e0; font-weight: 700;">
                                    <span>Total:</span>
                                    <span>KSh ${grandTotal.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    `;
                }

                function clearPaymentForm() {
                    // Clear all form fields
                    document.getElementById('customerPhone').value = '';
                    document.getElementById('customerName').value = '';
                    document.getElementById('customerEmail').value = '';
                }

                function showPaymentSuccess() {
                    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                    const grandTotal = totalAmount + deliveryFee;

                    paidAmount.textContent = grandTotal.toLocaleString();
                    orderNumber.textContent = `ESA-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
                    transactionDate.textContent = new Date().toLocaleString();

                    paymentModal.classList.remove('active');
                    successModal.classList.add('active');

                    // Clear cart after successful payment
                    cart = [];
                    updateCartSummary();
                    renderMerchandise();

                    // Clear the payment form fields for next order
                    clearPaymentForm();
                }

                function printReceipt() {
                    window.print();
                }

                function startNewOrder() {
                    // Clear everything and reset to initial state
                    successModal.classList.remove('active');
                    document.body.style.overflow = '';

                    // Ensure cart is empty
                    cart = [];
                    updateCartSummary();
                    renderMerchandise();

                    // Clear payment form
                    clearPaymentForm();

                    // Reset categories to 'all'
                    const allCategoryBtn = document.querySelector('[data-category="all"]');
                    if (allCategoryBtn) {
                        setActiveCategory(allCategoryBtn, 'all');
                    }

                    // Show success message for the new start
                    showNotification('Ready for new order! Browse our merchandise and add items to cart.', 'info');
                }

                function closeAllModals() {
                    if (paymentCountdownInterval) {
                        clearInterval(paymentCountdownInterval);
                        paymentCountdownInterval = null;
                    }
                    cartModal.classList.remove('active');
                    paymentModal.classList.remove('active');
                    successModal.classList.remove('active');
                    document.body.style.overflow = '';
                }

                function handleKeyboard(event) {
                    if (event.key === 'Escape') {
                        closeAllModals();
                    }
                }

                // Updated notification function for modal notifications
                function showModalNotification(message, type) {
                    // Remove any existing modal notification
                    const existingNotification = document.querySelector('.modal-notification-mega');
                    if (existingNotification) {
                        existingNotification.remove();
                    }

                    const notification = document.createElement('div');
                    notification.className = `modal-notification-mega modal-notification-${type}`;
                    notification.innerHTML = `
                        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                        <span>${message}</span>
                    `;

                    // Add to the active modal container
                    const activeModal = document.querySelector('.cart-modal-mega.active, .payment-modal-mega.active, .success-modal-mega.active');
                    if (activeModal) {
                        activeModal.querySelector('.modal-container-mega').appendChild(notification);

                        // Show notification
                        setTimeout(() => notification.classList.add('show'), 100);

                        // Auto-hide after 4 seconds
                        setTimeout(() => {
                            notification.classList.remove('show');
                            setTimeout(() => {
                                if (notification.parentNode) {
                                    notification.parentNode.removeChild(notification);
                                }
                            }, 300);
                        }, 4000);
                    }
                }

                // Keep the original notification function for non-modal notifications
                function showNotification(message, type) {
                    const notification = document.createElement('div');
                    notification.className = `notification-mega notification-${type}`;
                    notification.innerHTML = `
                        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                        <span>${message}</span>
                    `;

                    if (!document.querySelector('.notification-mega')) {
                        const style = document.createElement('style');
                        style.textContent = `
                            .notification-mega {
                                position: fixed;
                                top: 100px; /* CHANGED FROM 20px to 100px */
                                right: 20px;
                                background: white;
                                padding: 15px 20px;
                                border-radius: 10px;
                                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                                display: flex;
                                align-items: center;
                                gap: 10px;
                                z-index: 1001;
                                transform: translateX(400px);
                                transition: transform 0.3s ease;
                            }
                            .notification-success {
                                border-left: 4px solid #4CAF50;
                            }
                            .notification-error {
                                border-left: 4px solid #f44336;
                            }
                            .notification-info {
                                border-left: 4px solid #2196F3;
                            }
                            .notification-mega.show {
                                transform: translateX(0);
                            }
                        `;
                        document.head.appendChild(style);
                    }

                    document.body.appendChild(notification);

                    setTimeout(() => notification.classList.add('show'), 100);

                    setTimeout(() => {
                        notification.classList.remove('show');
                        setTimeout(() => {
                            if (notification.parentNode) {
                                notification.parentNode.removeChild(notification);
                            }
                        }, 300);
                    }, 4000);
                }

                // Global functions for cart operations
                window.removeFromCart = removeFromCart;

                // Initialize the section
                initMerchandise();
            });







        // Form submission
        const contactForm = document.getElementById('contactForm');

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // In a real application, you would send this data to a server
            // For this example, we'll just show an alert
            alert(`Thank you, ${name}! Your message has been sent successfully. We'll get back to you soon.`);

            // Reset the form
            contactForm.reset();
        });

        // Animate elements on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = `fadeInUp 1s ease forwards`;
                    entry.target.style.opacity = '0';
                    entry.target.style.animationDelay = entry.target.getAttribute('data-delay') || '0s';
                }
            });
        }, observerOptions);

        // Observe elements to animate
        const animateElements = document.querySelectorAll('.department-card-mega, .timeline-content-mega, .gallery-item-mega, .team-member-mega, .course-card-mega, .resource-card-mega, .merch-item-mega');

        animateElements.forEach((el, index) => {
            el.setAttribute('data-delay', `${index * 0.1}s`);
            observer.observe(el);
        });

        // Simple counter animation for stats
        const statNumbers = document.querySelectorAll('.stat-number-mega');
        let counted = false;

        function animateStats() {
            if (counted) return;

            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent);
                let current = 0;
                const increment = target / 50;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '');
                }, 30);
            });

            counted = true;
        }

        // Check if stats are in viewport
        const statsSection = document.querySelector('.about-stats-mega');
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                }
            });
        }, { threshold: 0.5 });

        if (statsSection) {
            statsObserver.observe(statsSection);
        }

        // Parallax effect for floating elements
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const floatingElements = document.querySelectorAll('.floating-element-mega');

            floatingElements.forEach((el, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                el.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
            });
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });








            // Partners Infinite Scrolling with Perfect Loop
            document.addEventListener('DOMContentLoaded', function() {
                initPartnersSlider();
                initImageLoading();
                initDonateModal();
            });

            function initPartnersSlider() {
                const slider = document.querySelector('.partners-slider-mega');
                const slide = document.querySelector('.partner-slide-mega');

                if (!slider || !slide) return;

                // Add fade elements
                const fadeLeft = document.createElement('div');
                fadeLeft.className = 'fade-left';
                const fadeRight = document.createElement('div');
                fadeRight.className = 'fade-right';
                slider.appendChild(fadeLeft);
                slider.appendChild(fadeRight);

                // Clone logos for seamless infinite effect
                const logos = slide.innerHTML;
                slide.innerHTML += logos + logos; // Double clone for smoother transition

                let animationId;
                let position = 0;
                const speed = 1.2;
                let isPaused = false;
                const logoWidth = 300;
                const gap = 40;
                const totalLogos = 7; // Updated to 7 with University of Eldoret
                const singleSetWidth = (logoWidth + gap) * totalLogos;

                function animate() {
                    if (!isPaused) {
                        position -= speed;

                        // Reset position when we've scrolled one complete set
                        if (Math.abs(position) >= singleSetWidth) {
                            position = 0;
                        }

                        slide.style.transform = `translateX(${position}px)`;
                    }

                    animationId = requestAnimationFrame(animate);
                }

                // Start animation
                animate();

                // Pause on hover
                slider.addEventListener('mouseenter', () => {
                    isPaused = true;
                });

                slider.addEventListener('mouseleave', () => {
                    isPaused = false;
                });

                // Cleanup on page hide
                document.addEventListener('visibilitychange', () => {
                    if (document.hidden) {
                        cancelAnimationFrame(animationId);
                    } else {
                        animate();
                    }
                });
            }

            function initImageLoading() {
                const images = document.querySelectorAll('.partner-image');

                images.forEach(img => {
                    img.addEventListener('load', function() {
                        this.classList.add('loaded');
                    });

                    img.addEventListener('error', function() {
                        this.style.display = 'none';
                        const fallback = this.nextElementSibling;
                        if (fallback && fallback.classList.contains('logo-fallback')) {
                            fallback.style.display = 'block';
                        }
                    });

                    // Check if image is already loaded
                    if (img.complete) {
                        if (img.naturalHeight === 0) {
                            img.dispatchEvent(new Event('error'));
                        } else {
                            img.dispatchEvent(new Event('load'));
                        }
                    }
                });
            }

            // Donate Modal Functionality
            function initDonateModal() {
                const donateBtn = document.getElementById('donateBtn');
                const donateModal = document.getElementById('donateModal');
                const donateForm = document.getElementById('donateForm');
                const closeBtn = document.querySelector('.donate-modal-mega .modal-close-mega');
                const cancelBtn = document.getElementById('donateCancel');
                const backdrop = document.querySelector('.donate-modal-mega .modal-backdrop-mega');

                if (!donateBtn || !donateModal) return;

                // Open modal
                donateBtn.addEventListener('click', () => {
                    donateModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                });

                // Close modal functions
                function closeModal() {
                    donateModal.classList.remove('active');
                    document.body.style.overflow = '';
                }

                closeBtn.addEventListener('click', closeModal);
                cancelBtn.addEventListener('click', closeModal);
                backdrop.addEventListener('click', closeModal);

                // Close on Escape key
                document.addEventListener('keydown', (e) => {
                    if (e.key === 'Escape' && donateModal.classList.contains('active')) {
                        closeModal();
                    }
                });

                // Form submission
                donateForm.addEventListener('submit', async (e) => {
                    e.preventDefault();

                    // Validate form
                    if (!validateDonateForm()) {
                        return;
                    }

                    // Get form data
                    const formData = {
                        name: document.getElementById('donateName').value.trim(),
                        email: document.getElementById('donateEmail').value.trim(),
                        phone: document.getElementById('donatePhone').value.trim(),
                        organization: document.getElementById('donateOrganization').value.trim(),
                        type: document.getElementById('donateType').value,
                        amount: document.getElementById('donateAmount').value.trim(),
                        purpose: document.getElementById('donatePurpose').value,
                        message: document.getElementById('donateMessage').value.trim(),
                        timeline: document.getElementById('donateTimeline').value,
                        callSchedule: document.getElementById('donateCall').value,
                        submittedAt: new Date().toISOString()
                    };

                    // Show loading state
                    const submitBtn = donateForm.querySelector('.btn-gold-mega');
                    const originalText = submitBtn.innerHTML;
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                    submitBtn.disabled = true;

                    try {
                        // Simulate API call
                        await submitDonateForm(formData);

                        // Show success message
                        showDonateSuccess(formData);

                        // Reset form
                        donateForm.reset();

                        // Close modal after success
                        setTimeout(() => {
                            closeModal();
                        }, 3000);

                    } catch (error) {
                        showDonateError();
                    } finally {
                        // Reset button
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }
                });

                // Form validation
                function validateDonateForm() {
                    const requiredFields = [
                        'donateName',
                        'donateEmail',
                        'donatePhone',
                        'donateType',
                        'donateMessage',
                        'donateCall'
                    ];

                    let isValid = true;

                    requiredFields.forEach(fieldId => {
                        const field = document.getElementById(fieldId);
                        const value = field.value.trim();

                        if (!value) {
                            field.style.borderColor = '#e74c3c';
                            isValid = false;
                        } else {
                            field.style.borderColor = '#e0e0e0';
                        }

                        // Email validation
                        if (fieldId === 'donateEmail' && value) {
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            if (!emailRegex.test(value)) {
                                field.style.borderColor = '#e74c3c';
                                isValid = false;
                            }
                        }
                    });

                    if (!isValid) {
                        showNotification('Please fill in all required fields correctly.', 'error');
                    }

                    return isValid;
                }

                // Clear field errors on input
                donateForm.querySelectorAll('input, select, textarea').forEach(field => {
                    field.addEventListener('input', () => {
                        field.style.borderColor = '#e0e0e0';
                    });
                });
            }

            // Simulate form submission
            async function submitDonateForm(formData) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        // Simulate 95% success rate
                        if (Math.random() > 0.05) {
                            // In real implementation, this would send data to your backend
                            console.log('Donation form submitted:', formData);

                            // Simulate sending email notification
                            simulateEmailNotification(formData);

                            resolve(formData);
                        } else {
                            reject(new Error('Submission failed'));
                        }
                    }, 2000);
                });
            }

            // Simulate email notification
            function simulateEmailNotification(formData) {
                const emailContent = `
                    Dear ${formData.name},

                    Thank you for your interest in supporting the Engineering Students Association (ESA) community!

                    We have received your donation inquiry with the following details:
                    - Support Type: ${formData.type}
                    - Estimated Value: ${formData.amount || 'Not specified'}
                    - Preferred Purpose: ${formData.purpose || 'General Support'}
                    - Timeline: ${formData.timeline || 'Flexible'}

                    We appreciate your willingness to support engineering education and development. Our team will contact you within 24-48 hours at ${formData.phone} to discuss the next steps and coordinate the donation process.

                    Preferred Call Schedule: ${getCallScheduleText(formData.callSchedule)}

                    If you have any immediate questions, please don't hesitate to reply to this email.

                    Thank you for making a difference in the engineering community!

                    Warm regards,
                    ESA Team
                    Engineering Students Association
                    University of Eldoret
                    esauoe@uoeld.ac.ke
                `;

                console.log('Email would be sent:', emailContent);
            }

            function getCallScheduleText(schedule) {
                const schedules = {
                    'morning': 'Weekday Mornings (8AM - 12PM)',
                    'afternoon': 'Weekday Afternoons (2PM - 5PM)',
                    'evening': 'Weekday Evenings (6PM - 8PM)',
                    'saturday': 'Saturday Morning (9AM - 12PM)',
                    'flexible': 'Flexible - We will coordinate via email'
                };
                return schedules[schedule] || schedule;
            }

            function showDonateSuccess(formData) {
                showNotification(
                    `Thank you, ${formData.name}! Your donation inquiry has been submitted successfully. We'll contact you within 24-48 hours to discuss next steps and schedule the call.`,
                    'success'
                );
            }

            function showDonateError() {
                showNotification(
                    'Sorry, there was an error submitting your donation inquiry. Please try again or contact us directly at esauoe@uoeld.ac.ke',
                    'error'
                );
            }

            // Notification system
            function showNotification(message, type) {
                // Remove existing notification
                const existingNotification = document.querySelector('.donate-notification');
                if (existingNotification) {
                    existingNotification.remove();
                }

                // Create new notification
                const notification = document.createElement('div');
                notification.className = `donate-notification ${type}`;
                notification.innerHTML = `
                    <div class="notification-content">
                        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                        <span>${message}</span>
                    </div>
                    <button class="notification-close">&times;</button>
                `;

                // Add styles
                notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
                    color: white;
                    padding: 20px 25px;
                    border-radius: 12px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                    z-index: 10001;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    max-width: 500px;
                    animation: slideInRight 0.3s ease;
                    font-size: 0.95rem;
                    line-height: 1.4;
                `;

                notification.querySelector('.notification-close').addEventListener('click', () => {
                    notification.remove();
                });

                document.body.appendChild(notification);

                // Auto remove after 8 seconds for success, 6 for error
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, type === 'success' ? 8000 : 6000);
            }

            // Add notification styles
            const donateStyles = `
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }

                .donate-notification .notification-content {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    flex: 1;
                }

                .donate-notification .notification-close {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.3rem;
                    cursor: pointer;
                    padding: 0;
                    width: 25px;
                    height: 25px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: opacity 0.2s ease;
                    flex-shrink: 0;
                }

                .donate-notification .notification-close:hover {
                    opacity: 0.8;
                }

                .fa-spin {
                    animation: fa-spin 1s infinite linear;
                }

                @keyframes fa-spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;

            // Inject styles
            const styleSheet = document.createElement('style');
            styleSheet.textContent = donateStyles;
            document.head.appendChild(styleSheet);








        // Scroll to Top Button - Complete Functionality
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize scroll to top button
            const scrollButton = document.getElementById('scrollToTop');

            if (!scrollButton) {
                console.error('Scroll to top button not found!');
                return;
            }

            let isScrolling = false;

            // Show/hide button based on scroll position
            function toggleScrollButton() {
                const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

                if (scrollPosition > 300 && !isScrolling) {
                    scrollButton.classList.add('visible');
                } else {
                    scrollButton.classList.remove('visible');
                }
            }

            // Smooth scroll to top function
            function scrollToTop() {
                if (isScrolling) return;

                isScrolling = true;

                // Add click animation
                scrollButton.style.transform = 'scale(0.9)';
                scrollButton.style.opacity = '0.8';

                // Smooth scroll to top
                const startPosition = window.pageYOffset;
                const startTime = performance.now();
                const duration = 800; // milliseconds

                function animateScroll(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);

                    // Easing function for smooth scroll
                    const easeOutQuart = 1 - Math.pow(1 - progress, 4);

                    window.scrollTo(0, startPosition * (1 - easeOutQuart));

                    if (progress < 1) {
                        requestAnimationFrame(animateScroll);
                    } else {
                        // Animation complete
                        isScrolling = false;
                        scrollButton.style.transform = '';
                        scrollButton.style.opacity = '';
                        toggleScrollButton();
                    }
                }

                requestAnimationFrame(animateScroll);
            }

            // Throttle scroll event for better performance
            let scrollTimeout;
            function throttleScroll() {
                if (!scrollTimeout) {
                    scrollTimeout = setTimeout(function() {
                        scrollTimeout = null;
                        toggleScrollButton();
                    }, 100);
                }
            }

            // Event listeners
            window.addEventListener('scroll', throttleScroll, { passive: true });

            scrollButton.addEventListener('click', scrollToTop);

            // Keyboard accessibility
            scrollButton.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    scrollToTop();
                }
            });

            // Touch device support
            scrollButton.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.9)';
            });

            scrollButton.addEventListener('touchend', function() {
                this.style.transform = '';
            });

            // Initial check on page load
            toggleScrollButton();

            console.log('Scroll to top button initialized successfully!');
        });

        // Fallback for requestAnimationFrame
        if (!window.requestAnimationFrame) {
            window.requestAnimationFrame = function(callback) {
                return setTimeout(function() {
                    callback(performance.now());
                }, 16);
            };
        }










             // Newsletter functionality
            document.addEventListener('DOMContentLoaded', function() {
                const newsletterForm = document.getElementById('newsletterForm');
                const newsletterEmail = document.getElementById('newsletterEmail');
                const newsletterMessage = document.getElementById('newsletterMessage');

                // Store subscribers in localStorage (in real app, this would be a server API)
                let subscribers = JSON.parse(localStorage.getItem('esa_newsletter_subscribers')) || [];

                if (newsletterForm) {
                    newsletterForm.addEventListener('submit', function(e) {
                        e.preventDefault();

                        const email = newsletterEmail.value.trim();

                        // Basic email validation
                        if (!email) {
                            showNewsletterMessage('Please enter your email address.', 'error');
                            return;
                        }

                        if (!isValidEmail(email)) {
                            showNewsletterMessage('Please enter a valid email address.', 'error');
                            return;
                        }

                        // Check if email already subscribed
                        if (subscribers.includes(email)) {
                            showNewsletterMessage('This email is already subscribed to our newsletter!', 'error');
                            return;
                        }

                        // Add to subscribers list
                        subscribers.push(email);
                        localStorage.setItem('esa_newsletter_subscribers', JSON.stringify(subscribers));

                        // Show success message
                        showNewsletterMessage('Thank you for subscribing to our newsletter! You\'ll receive updates soon.', 'success');

                        // Reset form
                        newsletterForm.reset();

                        // In a real application, you would send this to your server
                        console.log('New subscriber:', email);
                        console.log('Total subscribers:', subscribers.length);

                        // Simulate sending email notification (replace with actual email service)
                        simulateEmailNotification(email);
                    });

                    function isValidEmail(email) {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        return emailRegex.test(email);
                    }

                    function showNewsletterMessage(message, type) {
                        if (!newsletterMessage) return;

                        newsletterMessage.textContent = message;
                        newsletterMessage.className = 'newsletter-message';
                        newsletterMessage.classList.add(type);
                        newsletterMessage.style.display = 'block';
                        newsletterMessage.style.opacity = '1';

                        // Scroll to message if it's not visible
                        newsletterMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

                        // Hide message after 5 seconds
                        setTimeout(() => {
                            newsletterMessage.style.opacity = '0';
                            setTimeout(() => {
                                newsletterMessage.style.display = 'none';
                            }, 300);
                        }, 5000);
                    }

                    function simulateEmailNotification(email) {
                        // In a real application, you would integrate with an email service like:
                        // - SendGrid
                        // - Mailchimp
                        // - EmailJS
                        // - Your own backend API

                        console.log(`[EMAIL SIMULATION] Sending welcome email to: ${email}`);
                        console.log(`[EMAIL SIMULATION] Email content: Welcome to ESA UoE Newsletter!`);

                        // Example of what you would do with a real email service:
                        /*
                        emailjs.send("your_service_id", "your_template_id", {
                            to_email: email,
                            from_name: "ESA UoE",
                            subject: "Welcome to ESA UoE Newsletter!",
                            message: "Thank you for subscribing to our newsletter..."
                        })
                        .then(function(response) {
                            console.log('Email sent successfully:', response);
                        }, function(error) {
                            console.log('Failed to send email:', error);
                        });
                        */
                    }

                    // Add real-time email validation
                    newsletterEmail.addEventListener('input', function() {
                        const email = this.value.trim();
                        if (email && !isValidEmail(email)) {
                            this.style.borderColor = '#f44336';
                        } else {
                            this.style.borderColor = '';
                        }
                    });

                    // Prevent browser validation popup
                    newsletterForm.setAttribute('novalidate', 'true');

                    // Clear message when user starts typing again
                    newsletterEmail.addEventListener('focus', function() {
                        if (newsletterMessage.style.display === 'block') {
                            newsletterMessage.style.display = 'none';
                        }
                    });
                } else {
                    console.warn('Newsletter form not found');
                }
            });







                        // Contact Form Functionality
            class ContactFormManager {
                constructor() {
                    this.form = document.getElementById('contactForm');
                    this.submitBtn = this.form.querySelector('.btn-gold');
                    this.successMessage = document.getElementById('successMessage');
                    this.userNameSpan = document.getElementById('userName');
                    this.sendAnotherBtn = document.getElementById('sendAnother');

                    this.form.setAttribute('novalidate', 'true');
                    this.init();
                }

                init() {
                    this.setupEventListeners();
                    this.setupFormValidation();
                }

                setupEventListeners() {
                    this.form.addEventListener('submit', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        return false;
                    });

                    this.submitBtn.addEventListener('click', (e) => {
                        this.handleFormSubmit(e);
                    });

                    this.sendAnotherBtn.addEventListener('click', () => {
                        this.resetForm();
                    });

                    this.form.querySelectorAll('input, textarea, select').forEach(input => {
                        input.addEventListener('blur', () => {
                            this.validateField(input);
                        });

                        input.addEventListener('input', () => {
                            this.clearFieldError(input);
                            if (input.value.trim()) {
                                this.validateField(input);
                            }
                        });
                    });
                }

                setupFormValidation() {
                    const phoneInput = document.getElementById('phone1');
                    if (phoneInput) {
                        phoneInput.addEventListener('input', (e) => {
                            e.target.value = e.target.value.replace(/[^0-9+\-\s]/g, '');
                        });
                    }
                }

                validateField(field) {
                    const value = field.value.trim();
                    let isValid = true;
                    let errorMessage = '';

                    this.clearFieldError(field);

                    if (field.hasAttribute('required') && !value) {
                        isValid = false;
                        errorMessage = 'This field is required';
                    }

                    if (field.type === 'email' && value) {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(value)) {
                            isValid = false;
                            errorMessage = 'Please enter a valid email address';
                        }
                    }

                    if (field.id === 'phone1' && value) {
                        const phoneRegex = /^[\d\s+\-()]{10,}$/;
                        if (!phoneRegex.test(value)) {
                            isValid = false;
                            errorMessage = 'Please enter a valid phone number';
                        }
                    }

                    if (!isValid) {
                        this.showFieldError(field, errorMessage);
                    }

                    return isValid;
                }

                showFieldError(field, message) {
                    field.classList.add('error');
                    let errorElement = field.parentNode.querySelector('.field-error');
                    if (!errorElement) {
                        errorElement = document.createElement('div');
                        errorElement.className = 'field-error';
                        field.parentNode.appendChild(errorElement);
                    }
                    errorElement.textContent = message;
                }

                clearFieldError(field) {
                    field.classList.remove('error');
                    const errorElement = field.parentNode.querySelector('.field-error');
                    if (errorElement) {
                        errorElement.textContent = '';
                    }
                }

                async handleFormSubmit(e) {
                    if (e) {
                        e.preventDefault();
                        this.submitBtn.blur();
                    }

                    const fields = this.form.querySelectorAll('input, textarea, select');
                    let isFormValid = true;

                    fields.forEach(field => {
                        if (!this.validateField(field)) {
                            isFormValid = false;
                        }
                    });

                    if (!isFormValid) {
                        this.showNotification('Please fix the errors in the form', 'error');
                        return false;
                    }

                    this.setLoadingState(true);

                    try {
                        const formData = {
                            name: document.getElementById('name').value.trim(),
                            email: document.getElementById('email1').value.trim(),
                            phone: document.getElementById('phone1')?.value.trim() || '',
                            subject: document.getElementById('subject').value,
                            department: document.getElementById('department1').value,
                            message: document.getElementById('message').value.trim()
                        };

                        await this.submitFormData();
                        this.showSuccessMessage(formData.name);

                    } catch (error) {
                        this.showNotification('Sorry, there was an error sending your message. Please try again.', 'error');
                    } finally {
                        this.setLoadingState(false);
                    }

                    return false;
                }

                async submitFormData() {
                    return new Promise((resolve, reject) => {
                        setTimeout(() => {
                            if (Math.random() > 0.05) {
                                resolve();
                            } else {
                                reject(new Error('Network error'));
                            }
                        }, 1500);
                    });
                }

                setLoadingState(isLoading) {
                    if (isLoading) {
                        this.submitBtn.disabled = true;
                        this.submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                    } else {
                        this.submitBtn.disabled = false;
                        this.submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                    }
                }

                showSuccessMessage(userName) {
                    this.userNameSpan.textContent = userName;

                    // Simple fade out form
                    this.form.style.opacity = '0';
                    this.form.style.pointerEvents = 'none';
                    this.form.style.transition = 'opacity 0.3s ease';

                    // Show success message
                    setTimeout(() => {
                        this.successMessage.classList.add('active');
                    }, 300);
                }

                resetForm() {
                    // Hide success message
                    this.successMessage.classList.remove('active');

                    // Show form
                    setTimeout(() => {
                        this.form.style.opacity = '1';
                        this.form.style.pointerEvents = 'all';
                        this.form.reset();

                        // Clear errors
                        this.form.querySelectorAll('.field-error').forEach(error => {
                            error.textContent = '';
                        });
                        this.form.querySelectorAll('.error').forEach(field => {
                            field.classList.remove('error');
                        });
                    }, 300);
                }

                showNotification(message, type) {
                    const existingNotification = document.querySelector('.form-notification');
                    if (existingNotification) {
                        existingNotification.remove();
                    }

                    const notification = document.createElement('div');
                    notification.className = `form-notification ${type}`;
                    notification.innerHTML = `
                        <div class="notification-content">
                            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                            <span>${message}</span>
                        </div>
                        <button class="notification-close">&times;</button>
                    `;

                    document.body.appendChild(notification);

                    // Auto remove after 5 seconds
                    setTimeout(() => {
                        if (notification.parentNode) {
                            notification.remove();
                        }
                    }, 5000);
                }
            }

            // Add minimal CSS
            const contactStyles = `
                .field-error {
                    color: #e74c3c;
                    font-size: 0.8rem;
                    margin-top: 5px;
                }

                .error {
                    border-color: #e74c3c !important;
                }

                .form-notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #4CAF50;
                    color: white;
                    padding: 15px 20px;
                    border-radius: 5px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .form-notification.error {
                    background: #e74c3c;
                }

                .notification-close {
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                }

                .fa-spin {
                    animation: fa-spin 1s infinite linear;
                }

                @keyframes fa-spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;

            // Initialize
            document.addEventListener('DOMContentLoaded', () => {
                const styleSheet = document.createElement('style');
                styleSheet.textContent = contactStyles;
                document.head.appendChild(styleSheet);
                new ContactFormManager();
            });








// ESA Join Modal Functionality with Real M-Pesa Integration
document.addEventListener('DOMContentLoaded', function() {
    if (!document.getElementById('joinEsaBtn2')) return;

    // DOM Elements
    const joinEsaBtn2 = document.getElementById('joinEsaBtn2');
    const esaJoinModal2 = document.getElementById('esaJoinModal2');
    const esaPaymentModal2 = document.getElementById('esaPaymentModal2');
    const esaSuccessModal2 = document.getElementById('esaSuccessModal2');
    const closeButtons2 = document.querySelectorAll('.modal-close2');
    const cancelBtn2 = document.getElementById('cancelBtn2');
    const successOkBtn2 = document.getElementById('successOkBtn2');
    const esaForm2 = document.getElementById('esaForm2');
    const submitBtn2 = document.getElementById('submitBtn2');
    const admissionYear2 = document.getElementById('admissionYear2');
    const graduationYear2 = document.getElementById('graduationYear2');
    const batchNumberDisplay2 = document.getElementById('batchNumberDisplay2');
    const membershipDate2 = document.getElementById('membershipDate2');
    const payWithMpesa2 = document.getElementById('payWithMpesa2');
    const shareBtn2 = document.getElementById('shareBtn2');

    let currentMemberId = null;
    let currentBatchNumber = null;

    // Initialize years
    function initializeYears() {
        const currentYear = new Date().getFullYear();
        const startYear = 2018;
        const endYear = 2040;

        if (admissionYear2) {
            admissionYear2.innerHTML = '<option value="">Select Year</option>';
            for (let year = startYear; year <= endYear; year++) {
                const option = document.createElement('option');
                option.value = year;
                option.textContent = year;
                admissionYear2.appendChild(option);
            }
        }

        if (graduationYear2) {
            graduationYear2.innerHTML = '<option value="">Select Year</option>';
            for (let year = startYear; year <= endYear; year++) {
                const option = document.createElement('option');
                option.value = year;
                option.textContent = year;
                graduationYear2.appendChild(option);
            }
        }
    }

    // Validation functions
    function validateAdmissionNumber(number) {
        const regex = /^(cse|mpe|abe)\/\d{3}\/\d{2}$/i;
        return regex.test(number);
    }

    function validateEmail(email) {
        const regex = /^[a-z]{3}\d{5}@uoeld\.ac\.ke$/i;
        return regex.test(email);
    }

    function validatePhone(phone) {
        const regex = /^\+?254\d{9}$|^0\d{9}$/;
        return regex.test(phone);
    }

    function validateMpesaNumber(phone) {
        const regex = /^0[17]\d{8}$/;
        return regex.test(phone);
    }

    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        if (formGroup) {
            const errorElement = formGroup.querySelector('.error-message');
            if (errorElement) {
                errorElement.textContent = message;
            }
            input.style.borderColor = '#e74c3c';
        }
    }

    function clearError(input) {
        const formGroup = input.closest('.form-group');
        if (formGroup) {
            const errorElement = formGroup.querySelector('.error-message');
            if (errorElement) {
                errorElement.textContent = '';
            }
            input.style.borderColor = '#e0e0e0';
        }
    }

    function setupRealTimeValidation() {
        const inputs = esaForm2 ? esaForm2.querySelectorAll('input, select') : [];
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                validateField(this);
            });
            input.addEventListener('blur', function() {
                validateField(this);
            });
        });
    }

    function validateField(input) {
        const value = input.value.trim();
        switch(input.id) {
            case 'admissionNumber2':
                if (value && !validateAdmissionNumber(value)) {
                    showError(input, 'Please use format: cse/000/24, mpe/000/24, or abe/000/24');
                } else {
                    clearError(input);
                }
                break;
            case 'email2':
                if (value && !validateEmail(value)) {
                    showError(input, 'Please use school email format: cse00624@uoeld.ac.ke');
                } else {
                    clearError(input);
                }
                break;
            case 'phone2':
                if (value && !validatePhone(value)) {
                    showError(input, 'Please use valid Kenyan phone format: +254... or 0...');
                } else {
                    clearError(input);
                }
                break;
            case 'mpesaNumber2':
                if (value && !validateMpesaNumber(value)) {
                    showError(input, 'Please use valid M-Pesa number format: 07XXXXXXXX');
                } else {
                    clearError(input);
                }
                break;
            default:
                if (!value && input.required) {
                    showError(input, 'This field is required');
                } else {
                    clearError(input);
                }
        }
    }

    // Modal handlers
    function openModal(modal) {
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal(modal) {
        if (modal) {
            modal.classList.remove('active');
        }
        document.body.style.overflow = 'auto';
    }

    function closeAllModals() {
        const modals = document.querySelectorAll('.department-full-modal');
        modals.forEach(modal => {
            closeModal(modal);
        });
    }

    // Register member in database
    async function registerMember(formData) {
        try {
            const response = await fetch('/api/register-member/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCSRFToken()
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Registration error:', error);
            return { success: false, message: 'Registration failed' };
        }
    }

    // Process M-Pesa payment with real STK Push
    async function processMpesaPayment() {
        const mpesaNumberInput = document.getElementById('mpesaNumber2');
        if (!mpesaNumberInput) return;

        const mpesaNumber = mpesaNumberInput.value.trim();

        if (!validateMpesaNumber(mpesaNumber)) {
            showError(mpesaNumberInput, 'Please enter a valid M-Pesa number');
            return;
        }

        // Validate all form fields first
        const inputs = esaForm2.querySelectorAll('input[required], select[required]');
        let isValid = true;

        inputs.forEach(input => {
            validateField(input);
            if (!input.value.trim() || input.style.borderColor === 'rgb(231, 76, 60)') {
                isValid = false;
            }
        });

        if (!isValid) {
            showNotification('Please fill all required fields correctly before payment.', 'error');
            return;
        }

        // Collect form data
        const formData = {
            fullName: document.getElementById('fullName2')?.value || '',
            admissionNumber: document.getElementById('admissionNumber2')?.value || '',
            department: document.getElementById('department2')?.value || '',
            admissionYear: document.getElementById('admissionYear2')?.value || '',
            graduationYear: document.getElementById('graduationYear2')?.value || '',
            email: document.getElementById('email2')?.value || '',
            phone: document.getElementById('phone2')?.value || '',
            mpesaNumber: mpesaNumber
        };

        // Register member first
        const registration = await registerMember(formData);
        if (!registration.success) {
            showNotification(registration.message, 'error');
            return;
        }

        currentMemberId = registration.member_id;
        currentBatchNumber = registration.batch_number;

        // Now initiate payment
        openModal(esaPaymentModal2);

        try {
            const paymentResponse = await fetch('/api/initiate-payment/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCSRFToken()
                },
                body: JSON.stringify({
                    phone: mpesaNumber,
                    amount: 1 // Change to 500 for production
                })
            });

            const paymentData = await paymentResponse.json();

            if (paymentData.success) {
                showNotification('Payment request sent to your phone. Please enter your M-Pesa PIN.', 'success');

                // Poll for payment status (simplified - in production use webhooks)
                await checkPaymentStatus();

            } else {
                showNotification(paymentData.message, 'error');
                closeModal(esaPaymentModal2);
            }

        } catch (error) {
            showNotification('Payment failed. Please try again.', 'error');
            closeModal(esaPaymentModal2);
        }
    }

    // Check payment status (simplified - use webhooks in production)
    async function checkPaymentStatus() {
        let attempts = 0;
        const maxAttempts = 30; // 30 seconds

        const checkInterval = setInterval(async () => {
            attempts++;

            if (attempts >= maxAttempts) {
                clearInterval(checkInterval);
                showNotification('Payment timeout. Please try again.', 'error');
                closeModal(esaPaymentModal2);
                return;
            }

            // Simulate payment success for demo
            // In production, this would check your database
            if (attempts === 5) { // Simulate success after 5 seconds
                clearInterval(checkInterval);

                // Update payment status
                await updatePaymentStatus();

                showNotification('Payment successful! Welcome to ESA.', 'success');
                closeModal(esaPaymentModal2);

                // Show success modal
                if (batchNumberDisplay2) {
                    batchNumberDisplay2.textContent = currentBatchNumber;
                }
                if (membershipDate2) {
                    membershipDate2.textContent = new Date().toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                }

                closeModal(esaJoinModal2);
                openModal(esaSuccessModal2);

                // Send confirmation email
                await sendConfirmationEmail();
            }
        }, 1000);
    }

    async function updatePaymentStatus() {
        // Update member payment status in database
        try {
            await fetch('/api/update-payment-status/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCSRFToken()
                },
                body: JSON.stringify({
                    member_id: currentMemberId,
                    payment_status: true
                })
            });
        } catch (error) {
            console.error('Error updating payment status:', error);
        }
    }

    async function sendConfirmationEmail() {
        try {
            await fetch('/api/send-confirmation-email/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCSRFToken()
                },
                body: JSON.stringify({
                    member_id: currentMemberId
                })
            });
        } catch (error) {
            console.error('Error sending email:', error);
        }
    }

    function generateMembershipCard() {
        if (currentMemberId) {
            window.open(`/membership-pdf/${currentMemberId}/`, '_blank');
        }
    }

    function shareMembership() {
        if (navigator.share) {
            navigator.share({
                title: 'ESA Membership',
                text: `I just joined the Engineering Students Association! My membership number is ${currentBatchNumber}`,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(`I joined ESA! Membership: ${currentBatchNumber}`);
            showNotification('Membership details copied to clipboard!', 'success');
        }
    }

    // Get CSRF token for Django
    function getCSRFToken() {
        const name = 'csrftoken';
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    // Show notification
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">&times;</button>
        `;

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${type === 'success' ? '#27ae60' : '#e74c3c'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.3);
            z-index: 10021;
            display: flex;
            align-items: center;
            gap: 15px;
            max-width: 400px;
            animation: slideInRight 0.3s ease;
            font-weight: 500;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 5000);
    }

    // Add notification styles
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        .notification button {
            background: none;
            border: none;
            color: white;
            font-size: 18px;
            cursor: pointer;
            padding: 0;
            width: 20px;
            height: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: background 0.3s ease;
        }
        .notification button:hover {
            background: rgba(255,255,255,0.2);
        }
    `;
    document.head.appendChild(notificationStyles);

    // Event listeners
    function setupEventListeners() {
        if (joinEsaBtn2) {
            joinEsaBtn2.addEventListener('click', () => openModal(esaJoinModal2));
        }

        closeButtons2.forEach(button => {
            button.addEventListener('click', closeAllModals);
        });

        const backdrops = document.querySelectorAll('.modal-backdrop');
        backdrops.forEach(backdrop => {
            backdrop.addEventListener('click', closeAllModals);
        });

        if (cancelBtn2) {
            cancelBtn2.addEventListener('click', closeAllModals);
        }

        if (successOkBtn2) {
            successOkBtn2.addEventListener('click', function() {
                closeAllModals();
                generateMembershipCard();
            });
        }

        if (shareBtn2) {
            shareBtn2.addEventListener('click', shareMembership);
        }

        if (payWithMpesa2) {
            payWithMpesa2.addEventListener('click', processMpesaPayment);
        }

        setupRealTimeValidation();
    }

    // Initialize
    initializeYears();
    setupEventListeners();

    console.log('ESA Join Modal with Real M-Pesa Integration Initialized');
});






                // Image Rotator with 4-second base rotation
                class AdvancedImageRotator {
                    constructor() {
                        this.imageSets = {
                            general: [
                                'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
                                'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                                'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                                'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                                'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
                            ],
                            wie: [
                                'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
                                'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                                'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                                'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                                'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
                            ],
                            news: [
                                'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                                'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                                'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                                'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
                                'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
                            ]
                        };

                        this.currentIndices = {
                            general: 0,
                            wie: 0,
                            news: 0
                        };

                        this.rotationIntervals = new Map();
                        this.isRotating = new Map();

                        // Base rotation time in milliseconds (4 seconds)
                        this.baseRotationTime = 5000;

                        this.init();
                    }

                    getRandomImage(setName) {
                        const images = this.imageSets[setName];
                        let newIndex;

                        // Ensure we don't get the same image twice in a row
                        do {
                            newIndex = Math.floor(Math.random() * images.length);
                        } while (newIndex === this.currentIndices[setName] && images.length > 1);

                        this.currentIndices[setName] = newIndex;
                        return images[newIndex];
                    }

                    rotateImage(container) {
                        if (this.isRotating.get(container)) return;

                        this.isRotating.set(container, true);
                        const setName = container.getAttribute('data-image-set');
                        const img = container.querySelector('img');
                        const newSrc = this.getRandomImage(setName);

                        // Create a new image element for preloading and crossfade
                        const newImg = new Image();
                        newImg.src = newSrc;

                        newImg.onload = () => {
                            // Start crossfade effect
                            img.style.transition = 'opacity 1s ease-in-out';
                            img.style.opacity = '0.3';

                            setTimeout(() => {
                                // Swap the image source
                                img.src = newSrc;

                                // Fade in the new image
                                setTimeout(() => {
                                    img.style.opacity = '1';
                                    this.isRotating.set(container, false);
                                }, 100);
                            }, 1000);
                        };

                        newImg.onerror = () => {
                            console.warn('Failed to load image:', newSrc);
                            this.isRotating.set(container, false);
                        };
                    }

                    scheduleRotation(container) {
                        // Random delay around 4 seconds (3.5 to 4.5 seconds) for natural feel
                        const randomDelay = this.baseRotationTime - 500 + Math.random() * 1000;

                        const interval = setInterval(() => {
                            if (!this.isRotating.get(container)) {
                                this.rotateImage(container);
                            }
                        }, randomDelay);

                        this.rotationIntervals.set(container, interval);

                        // Initial rotation with random delay (1.5 to 3 seconds)
                        const initialDelay = 1500 + Math.random() * 1500;
                        setTimeout(() => {
                            this.rotateImage(container);
                        }, initialDelay);
                    }

                    init() {
                        const containers = document.querySelectorAll('.about-image-mega[data-image-set]');

                        // Add CSS for smooth transitions
                        this.addTransitionStyles();

                        // Initialize rotation state for each container
                        containers.forEach(container => {
                            this.isRotating.set(container, false);
                        });

                        // Start individual rotation schedules for each container
                        containers.forEach(container => {
                            this.scheduleRotation(container);
                        });

                        // Pause rotation when page is not visible
                        document.addEventListener('visibilitychange', () => {
                            if (document.hidden) {
                                this.pauseAllRotations();
                            } else {
                                this.resumeAllRotations();
                            }
                        });

                        console.log('Image rotator initialized with 4-second base rotation');
                    }

                    addTransitionStyles() {
                        const style = document.createElement('style');
                        style.textContent = `
                            .about-image-mega img {
                                transition: opacity 1s ease-in-out !important;
                            }
                            .about-image-mega:hover img {
                                transition: opacity 1s ease-in-out, transform 0.6s ease !important;
                            }
                        `;
                        document.head.appendChild(style);
                    }

                    pauseAllRotations() {
                        this.rotationIntervals.forEach((interval, container) => {
                            clearInterval(interval);
                        });
                    }

                    resumeAllRotations() {
                        const containers = document.querySelectorAll('.about-image-mega[data-image-set]');
                        containers.forEach(container => {
                            this.scheduleRotation(container);
                        });
                    }

                    destroy() {
                        this.pauseAllRotations();
                        this.rotationIntervals.clear();
                        this.isRotating.clear();
                    }
                }

                // Initialize when DOM is ready
                document.addEventListener('DOMContentLoaded', () => {
                    // Initialize the advanced image rotator
                    window.imageRotator = new AdvancedImageRotator();
                });

                // Alternative: Simple 4-second rotator (if you prefer simpler code)
                function initializeFourSecondRotator() {
                    const containers = document.querySelectorAll('.about-image-mega[data-image-set]');
                    const imageSets = {
                        general: [
                            'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
                            'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                            'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                            'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                            'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
                        ],
                        wie: [
                            'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                            'https://images.unsplash.com/photo-1581094794360-5a0cf566038a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                            'https://images.unsplash.com/photo-1581094794358-8460cf969b14?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                            'https://images.unsplash.com/photo-1581094794355-9270955b0385?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                            'https://images.unsplash.com/photo-1581094794359-8460cf969a14?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
                        ],
                        news: [
                            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                            'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                            'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
                            'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
                            'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
                        ]
                    };

                    containers.forEach(container => {
                        const setName = container.getAttribute('data-image-set');
                        const img = container.querySelector('img');
                        let currentIndex = 0;

                        // Set initial transition
                        img.style.transition = 'opacity 1s ease-in-out';

                        // Start rotation with 4-second interval plus some randomness
                        const interval = setInterval(() => {
                            const images = imageSets[setName];
                            let newIndex;

                            do {
                                newIndex = Math.floor(Math.random() * images.length);
                            } while (newIndex === currentIndex && images.length > 1);

                            currentIndex = newIndex;

                            // Smooth transition
                            img.style.opacity = '0.3';
                            setTimeout(() => {
                                img.src = images[newIndex];
                                setTimeout(() => {
                                    img.style.opacity = '1';
                                }, 100);
                            }, 1000);

                        }, 4000 + Math.random() * 1000); // 4-5 seconds

                        // Store interval for cleanup
                        container.dataset.rotationInterval = interval;

                        // Initial rotation after random delay
                        setTimeout(() => {
                            const images = imageSets[setName];
                            const newIndex = Math.floor(Math.random() * images.length);
                            currentIndex = newIndex;
                            img.src = images[newIndex];
                        }, 1000 + Math.random() * 2000);
                    });

                    // Cleanup function
                    window.cleanupRotations = function() {
                        containers.forEach(container => {
                            if (container.dataset.rotationInterval) {
                                clearInterval(parseInt(container.dataset.rotationInterval));
                            }
                        });
                    };
                }

                // Uncomment the line below if you want to use the simpler version instead
                // document.addEventListener('DOMContentLoaded', initializeFourSecondRotator);