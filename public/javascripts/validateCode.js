async function validateCode() {
  
    const code = editor.getValue(); // 실제 입력한 코드
    console.log("제출한 코드:", code);

    try {

        const res = await fetch("http://localhost:8000/run", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ code })
        });

        const data = await res.json();
        document.getElementById("resultArea").innerText = data.result;

        } catch (err) {
        console.error(err);
        document.getElementById("resultArea").innerText = "실행 중 오류 발생";
    }
}