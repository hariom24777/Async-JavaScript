const container = document.querySelector(".key-table");
window.addEventListener("keydown", (e) => {
  container.innerHTML = `
        <div class="box">
        <table>
        <tr>
          <th>Key</th>
          <th>Key Code</th>
          <th>Code</th>
        </tr>
        <tr>
          <td>${e.key === ' ' ? 'Space' : e.key}</td>
          <td>${e.keyCode}</td>
          <td>${e.code}</td>
        </tr>
      </table>
      </div>
    `;
});
