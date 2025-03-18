// subscribe.js - Include this in all pages where you want the subscription form
document.addEventListener('DOMContentLoaded', function() {
    // Find all elements with class 'subscribe-here'
    const subscribeContainers = document.querySelectorAll('.subscribe-here');
    
    subscribeContainers.forEach(container => {
        // Create the subscription form HTML
        container.innerHTML = `
            <div style="text-align: center;">
            <p>If you like my posts, get new ones emailed to you: 
            <span class="email-control">
                <input type="email" class="email-input" placeholder="you@example.com" required>
                <button type="submit" class="subscribe-button">subscribe</button>
                <span class="status-message"></span>
            </span>
            </p>
            </div>
        `;

        // Add event listener to the button
        const button = container.querySelector('.subscribe-button');
        const input = container.querySelector('.email-input');
        const message = container.querySelector('.status-message');

        button.addEventListener('click', function() {
            if (!input.value) return;
        
            message.textContent = 'Sending...';
            message.style.display = 'inline-block';
        
            fetch('https://lnj1jz9jq1.execute-api.us-east-2.amazonaws.com/prod/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: input.value })
            })
            .then(response => response.json())
            .then(data => {
                message.textContent = 'Please check your email to confirm.';
                input.value = '';
            })
            .catch(error => {
            message.textContent = 'Error: Please try again.';
            console.error('Error:', error);
            });
        });
    });
});