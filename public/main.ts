window.addEventListener('load', () =>{
    const table: HTMLTableSectionElement | null = document.querySelector("tbody");

    table?.addEventListener("click", (e): void => {
        const row = e.target as Element

        console.log(row.parentElement?.id)
    })
})