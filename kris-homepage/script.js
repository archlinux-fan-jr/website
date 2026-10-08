// 24h Clock
function updateClock(){
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour12: false });
    document.getElementById("clock").textContent = time;
}
setInterval(updateClock,1000);
updateClock();

// Theme toggle with memory
function toggleMode(){
    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

// Load saved theme
window.onload = function(){
    const savedTheme = localStorage.getItem("theme");
    if(savedTheme === "dark"){
        document.body.classList.add("dark");
    }
};
