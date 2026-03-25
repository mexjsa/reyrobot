const neniChat = document.getElementById('neni-chat-window');
const neniMessages = document.getElementById('neni-messages');
const neniIcon = document.getElementById('neni-icon');
let isNeniChatOpen = false;
let hasNeniGreeted = false;

function checkScrollNeni() {
    if (window.scrollY > 300 && !hasNeniGreeted) {
        toggleNeniChat();
        hasNeniGreeted = true;
    }
}
window.addEventListener('scroll', checkScrollNeni);
setTimeout(checkScrollNeni, 1000); // Check inicial un poquitito después de Brayan

function toggleNeniChat() {
    isNeniChatOpen = !isNeniChatOpen;
    if (isNeniChatOpen) {
        // En estética tianguis, ya NO cerramos a Brayan, ¡puro mercado libre gritando al mismo tiempo!
        
        neniChat.style.display = 'flex';
        neniIcon.innerHTML = '💅';
        neniIcon.style.animation = 'none';
        if(neniMessages.children.length === 0) {
            startNeniChat();
        }
    } else {
        neniChat.style.display = 'none';
        neniIcon.innerHTML = '<img src="img/neni.png" alt="La Neni" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">';
        neniIcon.style.animation = 'flotarNeni 3s infinite ease-in-out';
    }
}

function startNeniChat() {
    setTimeout(() => {
        addNeniBotMsg('¡Holiiii nena/nene! ✨ Yo soy La Neni y vine a entregarte tu paquete de Inteligencia Artificial. ¿De qué antojito tecnológico cerramos venta hoy en el punto medio? Tengo promos divinas. 🌸', [
            { text: "Me urgen muchas ventas neni", action: "ventas" },
            { text: "Ay me urgen unos bots", action: "bots" },
            { text: "Ocupo mi página tipo Zara", action: "web" }
        ]);
    }, 500);
}

function addNeniUserMsg(text) {
    const msg = document.createElement('div');
    msg.className = 'msg-n user-n';
    msg.innerText = text;
    neniMessages.appendChild(msg);
    scrollNeniToBottom();
}

function addNeniBotMsg(text, options = []) {
    const typing = document.createElement('div');
    typing.className = 'msg-n bot-n typing-n';
    typing.innerText = 'Buscando el sticker de gracias por tu compra...';
    neniMessages.appendChild(typing);
    scrollNeniToBottom();

    setTimeout(() => {
        neniMessages.removeChild(typing);
        const msg = document.createElement('div');
        msg.className = 'msg-n bot-n';
        msg.innerHTML = text; 
        neniMessages.appendChild(msg);

        if (options.length > 0) {
            const optsDiv = document.createElement('div');
            optsDiv.className = 'chat-options';
            options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'btn-chat-neni-opt';
                btn.innerText = opt.text;
                btn.onclick = () => handleNeniOption(opt, optsDiv);
                optsDiv.appendChild(btn);
            });
            neniMessages.appendChild(optsDiv);
        }
        scrollNeniToBottom();
    }, 1200); 
}

function handleNeniOption(opt, parentDiv) {
    parentDiv.remove(); 
    addNeniUserMsg(opt.text);
    
    switch(opt.action) {
        case 'ventas':
            addNeniBotMsg('¡Ayy, obvio hermosa/hermoso! 🥰 Para que ese emprendimiento facture al 1000%, ¿quieres que te suelte a un asistente de Whats (Chatbot) para que conteste DM\'s automáticos o te abro tu Catálogo Virtual tipo boutique? 💸💅', [
                {text: "Quiero el Asistente Neni (Bot)", action: "bots"},
                {text: "Quiero el Catálogo (Web)", action: "web"}
            ]);
            break;
        case 'bots':
            addNeniBotMsg('¡No manchess, los chatbots son la sal en mi limonada! 🍋 Responden 24/7 pidiendo el comprobante por ti, neni. Me los traje en tanda desde 3,000 varitos. ¿Le paso tus datos a mi coordinador pa apartarte uno? 📅💕 (Recuerda que sin depósito me cancelan el pedido 😌)', [
                {text: "Súper sí, pásale mis datos", action: "contacto"},
                {text: "Lo checo con la almohada", action: "rechazo"}
            ]);
            break;
        case 'web':
            addNeniBotMsg('Una paginita divina para que ya no te pidan fotos del stock por DM. Quedan padrísimas, con colores súper wow y carrito de compras desde 5,000 pesitos. ¡Amamos! ¿Cierro tu guía de entrega hoy preciosa/o? 🛍️✨', [
                {text: "¡Sí! Aquí te pido los datos", action: "contacto"},
                {text: "Mmm, déjame revisar mi beca", action: "rechazo"}
            ]);
            break;
        case 'contacto':
            addNeniBotMsg('¡YAAAS neni, excelente decisión! 🎉 Déjame tus datos abajito, hermosa/o. Y en 5 mins mi queridísimo Juan de Nexos (que es un sol) te manda Whats de confirmación. ✨');
            
            const formHTML = document.createElement('div');
            formHTML.innerHTML = `
                <input type="text" id="n-name" placeholder="Tu superlindo nombre 💖" style="width:100%; margin-bottom:8px; padding:12px; border:3px solid var(--rosa-mexicano); border-radius:8px; font-weight:bold;">
                <input type="tel" id="n-tel" placeholder="Tú cel para el grupo de Whats 📱" style="width:100%; margin-bottom:8px; padding:12px; border:3px solid var(--rosa-mexicano); border-radius:8px; font-weight:bold;">
                <button id="n-submit" onclick="sendNeniLead()" style="width:100%; background:var(--rosa-mexicano); color:white; border:none; padding:12px; font-weight:bolder; cursor:pointer; font-size:1.1rem; border-radius:15px; box-shadow:0px 5px 0px rgba(0,0,0,0.5); text-transform:uppercase;">¡APÁRTAME EL STOCK!</button>
            `;
            neniMessages.appendChild(formHTML);
            scrollNeniToBottom();
            break;
        case 'rechazo':
            addNeniBotMsg('No te me estreses neni, todo a su ritmo. Cuando caiga la quincenita o consigas cobrarlos de la caja de zapatos, aquí me tienes. ¡Mil bendiciones pa tus ventas! 🌸😘💸');
            break;
    }
}

function sendNeniLead() {
    const nombre = document.getElementById('n-name').value;
    const whats = document.getElementById('n-tel').value;
    if(!nombre || !whats) {
         alert("¡Ay neni, te faltó poner un dato pliiis, si no no pasa en la refaccionaria! 🙏💖");
         return;
    }
    
    document.getElementById('n-name').disabled = true;
    document.getElementById('n-tel').disabled = true;
    const btn = document.getElementById('n-submit');
    btn.innerText = "¡CONFIRMANDO PEDIDO...!";
    btn.disabled = true;
    btn.style.opacity = "0.7";

    // La Neni asume que firebase se carga en el html raiz (que es correcto)
    db.collection("real_estate_leads").add({
        name: nombre,
        phone: whats,
        email: "No proporcionó neni / Solo Whats",
        source: "Rey Robot (Neni)",
        score: "Proespecto de Lujo 🦋",
        date_preference: new Date().toLocaleDateString('es-MX'),
        created_at: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        btn.innerText = "¡SÚPER APARTADO NENI! ✨";
        addNeniBotMsg('¡Súper listo hermosa/o ' + nombre + '! 🎉 Ya le mandé tu ticket de entrega a Juan. No te me vayas a despistar que al rato te marca sin falta de este num 55 1480 3488. ¡Mil gracias por tu bellísima compra! 💖📱🛍️');
    }).catch((error) => {
        console.error("Error subiendo lead de Neni: ", error);
        btn.innerText = "Error (Escríbeme por INBOX)";
        addNeniBotMsg('Ah caray neni, creo que se le fue el saldo a mi plan Telcel... ¡Mejor escríbele ahorita por el Whats directo a Juan: 55 1480 3488 de mi parte, por fi! 😿');
    });
}

function scrollNeniToBottom() {
    neniMessages.scrollTop = neniMessages.scrollHeight;
}
