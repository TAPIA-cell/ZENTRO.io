function mostrarVentas() {
  const ventas = JSON.parse(localStorage.getItem("ventas")) || [];
  const tabla = document.getElementById("tablaVentas");
  const sinVentas = document.getElementById("sinVentas");

  tabla.innerHTML = "";

  if (ventas.length === 0) {
    sinVentas.classList.remove("d-none");
    return;
  }

  sinVentas.classList.add("d-none");

  ventas.forEach(v => {
    const productos = v.items.map(item => 
      `${item.nombre} (x${item.cantidad}) - $${item.precio * item.cantidad}`
    ).join("<br>");

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${v.id}</td>
      <td>${v.usuario}</td>
      <td>${v.fecha}</td>
      <td>${productos}</td>
      <td>$${v.total}</td>
    `;
    tabla.appendChild(tr);
  });
}
function exportarVentas() {
  const ventas = JSON.parse(localStorage.getItem("ventas")) || [];
  if (ventas.length === 0) {
    alert("⚠️ No hay ventas para exportar.");
    return;
  }

  // Transformar datos a formato tabla
  const datos = ventas.map(v => {
    return {
      ID: v.id,
      Usuario: v.usuario,
      Fecha: v.fecha,
      Productos: v.items.map(i => `${i.nombre} (x${i.cantidad})`).join(" | "),
      Total: v.total
    };
  });

  // Crear hoja de Excel
  const ws = XLSX.utils.json_to_sheet(datos);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Ventas");

  // Descargar archivo Excel
  XLSX.writeFile(wb, "ventas.xlsx");
}
document.addEventListener("DOMContentLoaded", mostrarVentas);
