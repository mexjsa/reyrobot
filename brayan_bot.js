// Configuración de Firebase — la apiKey viene de config.js (nunca hardcodear aquí)
const firebaseConfig = {
    apiKey: window.ENV?.GOOGLE_API_KEY,
    authDomain: "calle9-2ca66.firebaseapp.com",
    projectId: "calle9-2ca66",
    storageBucket: "calle9-2ca66.firebasestorage.app",
    messagingSenderId: "1064897799867",
    appId: "1:1064897799867:web:740a957d9d742e63f1ab9e"
};
// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

const brayanChat = document.getElementById('brayan-chat-window');
const brayanMessages = document.getElementById('brayan-messages');
const brayanIcon = document.getElementById('brayan-icon');
let isChatOpen = false;
let hasGreeted = false;

function checkScrollBrayan() {
    if (window.scrollY > 250 && !hasGreeted) {
        toggleChat();
        hasGreeted = true;
    }
}
window.addEventListener('scroll', checkScrollBrayan);
setTimeout(checkScrollBrayan, 800); // Check inicial por si ya estaban a medio sitio

function toggleChat() {
    isChatOpen = !isChatOpen;
    if (isChatOpen) {
        // En estética tianguis, ya NO cerramos a La Neni, ¡que griten los dos al mismo tiempo!
        
        brayanChat.style.display = 'flex';
        brayanIcon.innerHTML = '❌';
        brayanIcon.style.animation = 'none';
        if(brayanMessages.children.length === 0) {
            startChat();
        }
    } else {
        brayanChat.style.display = 'none';
        brayanIcon.innerHTML = '<img src="img/brayan.png" alt="El Brayan" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">';
    }
}

function startChat() {
    // Guiño inicial
    setTimeout(() => {
        addBotMsg('¡Quihubo padrino! Yo soy El Brayan, tu chalán cibernético. 🤖🦷<br>¿A qué le andamos tirando hoy? ¿Quieres levantar el changarro o nomás andas de mirón?', [
            { text: "Quiero vender a lo wey", action: "ventas" },
            { text: "Me late eso de los robots", action: "bots" },
            { text: "Ocupo página perrona", action: "web" }
        ]);
    }, 500);
}

function addUserMsg(text) {
    const msg = document.createElement('div');
    msg.className = 'msg user';
    msg.innerText = text;
    brayanMessages.appendChild(msg);
    scrollToBottom();
}

function addBotMsg(text, options = []) {
    const typing = document.createElement('div');
    typing.className = 'msg bot typing';
    typing.innerText = 'El Brayan tecleando con un dedo...';
    brayanMessages.appendChild(typing);
    scrollToBottom();

    setTimeout(() => {
        brayanMessages.removeChild(typing);
        const msg = document.createElement('div');
        msg.className = 'msg bot';
        msg.innerHTML = text; // Permite inyectar HTML como los inputs al final
        brayanMessages.appendChild(msg);

        if (options.length > 0) {
            const optsDiv = document.createElement('div');
            optsDiv.className = 'chat-options';
            options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'btn-chat-opt';
                btn.innerText = opt.text;
                btn.onclick = () => handleOption(opt, optsDiv);
                optsDiv.appendChild(btn);
            });
            brayanMessages.appendChild(optsDiv);
        }
        scrollToBottom();
    }, 1200); // 1.2 segundos para simular que está "escribiendo"
}

function handleOption(opt, parentDiv) {
    parentDiv.remove(); // Desaparecer las opciones para que no las repitan
    addUserMsg(opt.text);
    
    switch(opt.action) {
        case 'ventas':
            addBotMsg('¡Esa es la pinche actitud! 🔥 Pa levantar el vuelo tenemos de dos sopas, o te pongo a un chavito de Whats (Chatbot) a contestar en chinga, o te armo tu sucursal mamalona (Web) en el interné. ¿Cuál te late más mijo?', [
                {text: "El chavito de Whats (Chatbot)", action: "bots"},
                {text: "La sucursal virtual (Página Web)", action: "web"}
            ]);
            break;
        case 'bots':
            addBotMsg('¡Uff, los chatbots son el reverendo hitazo! El robot le contesta a tus clientes en corto y a la hora que sea, hasta en domingo de resurrección. Te los dejo desde 3,000 varitos. ¿Te gustaría agendar llamadita con el patrón Juan pa cerrar trato?', [
                {text: "Simón, córrele el fonazo", action: "contacto"},
                {text: "Todavía no compa", action: "rechazo"}
            ]);
            break;
        case 'web':
            addBotMsg('Una paginita chingona para que tu local ya no se vea de vecindad y te topen en el Google. Se arman bien chidas, sin mam*das y súper formales por 5,000 bolas nomás. ¡Puro ofertón de tianguis! ¿Le caemos con el contrato papi?', [
                {text: "Va, que me hable el mero jefe", action: "contacto"},
                {text: "Aguanta la carnes asada, ando viendo", action: "rechazo"}
            ]);
            break;
        case 'contacto':
            addBotMsg('¡Mesa que más aplauda! 👏 Deja tus datos sin albur y en chinga te echa un fonazo el Jefe Juan de Nexos. Ponme acá abajito tu nombre mameluco y el güats.');
            
            const formHTML = document.createElement('div');
            formHTML.innerHTML = `
                <input type="text" id="b-name" placeholder="Tu nombre, sin albur" style="width:100%; margin-bottom:8px; padding:10px; border:3px solid var(--negro-profundo); font-weight:bold;">
                <input type="tel" id="b-tel" placeholder="Número pa' los Whats" style="width:100%; margin-bottom:8px; padding:10px; border:3px solid var(--negro-profundo); font-weight:bold;">
                <button id="b-submit" onclick="sendLead()" style="width:100%; background:var(--verde-limon); border:4px solid var(--negro-profundo); padding:10px; font-weight:bold; cursor:pointer; font-size:1.2rem; box-shadow:4px 4px 0 black; text-transform:uppercase; transition:all 0.2s;">¡Fierro pariente!</button>
            `;
            brayanMessages.appendChild(formHTML);
            scrollToBottom();
            break;
        case 'rechazo':
            addBotMsg('Sobres, ¡no hay de piña! 🍍 Aquí me quedo en la esquinita rascándome el ombligo por si al rato me ocupas o quieres soltar los billetes. ¡Chido tu coto!');
            break;
    }
}

function sendLead() {
    const nombre = document.getElementById('b-name').value;
    const whats = document.getElementById('b-tel').value;
    if(!nombre || !whats) {
         alert("¡No te hagas pato! Pásame bien los datos.");
         return;
    }
    
    document.getElementById('b-name').disabled = true;
    document.getElementById('b-tel').disabled = true;
    const btn = document.getElementById('b-submit');
    btn.innerText = "Mandando paloma...";
    btn.style.background = "#ccc";
    btn.disabled = true;

    // Enviar a Firebase uniendo los leads (mismos inputs + source)
    db.collection("real_estate_leads").add({
        name: nombre,
        phone: whats,
        email: "No proporcionado (El Brayan)", // Para completar la forma
        source: "Rey Robot", // Identificador de la web/bot
        score: "Proespecto Fresco (Web)",
        date_preference: new Date().toLocaleDateString('es-MX'),
        created_at: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        btn.innerText = "¡Enviado a huev*!";
        addBotMsg('¡Vientos huracanados mi estimado ' + nombre + '! Ya le pasé el pitazo a la jefa de jefes allá en la base de datos de Firebase. Agarra tu celular porque ya mero te marcan para subirte a la zona VIP. 📞🚀');
    }).catch((error) => {
        console.error("Error subiendo lead de Brayan: ", error);
        btn.innerText = "Error (Manda Whats)";
        addBotMsg('¡Sopas! Hubo una trabada en el cable de la luz. Échate un telefonazo o Whats directo al 55 1480 3488 padrino, no te quedes con las ganas.');
    });
}

function scrollToBottom() {
    brayanMessages.scrollTop = brayanMessages.scrollHeight;
}
