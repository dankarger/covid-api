const regionButtons= document.querySelectorAll('.regions-buttons-div .regions-button')


export function selectedRegionButton(selectedButton){
    regionButtons.forEach(button=>{
        button.classList.remove('selected');

    })
    selectedButton.classList.add('selected');

}