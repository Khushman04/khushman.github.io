document.addEventListener('DOMContentLoaded', async function(){
    let submit_button = this.getElementById('submission');
    submit_button.addEventListener('click', post_data);
    let show_msg = this.getElementById('show_msgs');
    show_msg.addEventListener('click', show_messages);
});

async function post_data(){
    let username = document.getElementById("user_name").value.trim();
    let usermessage = document.getElementById("user_message").value.trim();
    let messageCategory = document.getElementById("message_category").value;
    if(username && usermessage)
    {   
        const data_packet = {
            name: username,
            message: usermessage,
            category: messageCategory // Include the message category in the data packet
        }
        try{
            const response = await fetch('https://lab7part2-default-rtdb.firebaseio.com/msgs.json',
            {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                    },
                body: JSON.stringify(data_packet)
            });
            if(!response.ok){ throw new Error('Error saving data');}
            show_messages();
        }

    catch(error){
        console.error('Error saving data :' , error.message);
    }
}
    else{
        alert("Please fill in all fields!");    
    }
}

async function show_messages(){
    
    let sub_form = document.getElementById("sub-form");
    sub_form.style.display = "none"; 
    try{
        const response = await fetch('https://lab7part2-default-rtdb.firebaseio.com/msgs.json');
        const response_data = await response.json();
        let div_to_modify = document.getElementById("message_log");
        div_to_modify.style.display = "block";
        div_to_modify.innerHTML = '<tr><td><h1>Message LOGS</h1></td></tr>'; // Clear previous logs to avoid duplication
        for(let json_block_num in response_data)
        {
            let json_block = response_data[json_block_num];
            let priorityTag = json_block.category === "Priority" ? "<strong>Priority</strong><br/>" : "";
            div_to_modify.innerHTML += `<tr><td>${priorityTag}Name:</td><td>${json_block.name}</td></tr><tr><td>Message:</td><td>${json_block.message}</td></tr>`;
        }
    }
    catch(error){
        console.error('Error fetching data:', error);
    }
}
