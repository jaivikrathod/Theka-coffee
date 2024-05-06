// Listen for Bootstrap tab change
document.querySelectorAll('button[data-bs-toggle="tab"]').forEach((el) => {
    el.addEventListener('shown.bs.tab', () => {
        DataTable.tables({ visible: true, api: true }).columns.adjust();
    });
});
 
new DataTable('table.table', {
    // ajax: './some2.txt',
    paging: false,
    scrollCollapse: true,
    scrollY: 200
});
 
// Apply a search to the second table for the demo
new DataTable.Api('#myTable2').search('New York').draw();