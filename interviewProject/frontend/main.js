$( document ).ready(function() {
    
// var sub_btn = $('#sub_btn');
var sub_btn_add =  document.getElementById('sub_btn_add');
var sub_btn =  document.getElementById('sub_btn');
var add_btn = document.getElementById('add_btn');
// let u_div = document.getElementById('udt');
// let u_text = document.getElementById('in_upd');
// let u_btn = document.getElementById('u_btn');
// let content = document.getElementById('content');
in_display();
add_btn.onclick =function(){
    console.log('add btn')
    $('#inp_id').val("")
    $('#inp_name').val("")
    $('#inp_city').val("")
    $('#inp_country').val("")
    $('#inp_desc').val("")
    $('#inp_table').show()
    $('#inpTblCap').text("Add")
    $('#sub_btn_td').hide()
    $('#sub_btn_add_td').show()
}
// add_btn.click(function(){
    
// })
sub_btn.onclick = function(){
    var data= {
        id: $('#inp_id').val(),
        name: $('#inp_name').val(),
        city: $('#inp_city').val(),
        country: $('#inp_country').val(),
        desc : $('#inp_desc').val()
        }
    $.post('/update',{'data' : data},function(data){
        window.location.reload(true)
    })
}

sub_btn_add.onclick = function(){
    var data= {
        id: $('#inp_id').val(),
        name: $('#inp_name').val(),
        city: $('#inp_city').val(),
        country: $('#inp_country').val(),
        desc : $('#inp_desc').val()
        }
    $.post('/add',{'data' : data},function(data){
        window.location.reload(true)
    })
}
function in_display(){
    $.get('/in_display',function(data){
        console.log(data);
        for(i = 0;i<data.length;i++){
            addRow(data[i]);
        }
    })
}

function addRow(data)
{
    console.log(data)
    var tbody = document.getElementById('mainTable');
    var row = document.createElement('tr')
    var elem_id = document.createElement('td')
    var id_text = document.createTextNode(data['data[id]'])
    elem_id.appendChild(id_text)
    var elem_name = document.createElement('td')
    var name_text = document.createTextNode(data['data[name]'])
    elem_name.appendChild(name_text)
    var elem_city = document.createElement('td')
    var city_text = document.createTextNode(data['data[city]'])
    elem_city.appendChild(city_text)
    var elem_country = document.createElement('td')
    var country_text = document.createTextNode(data['data[country]'])
    elem_country.appendChild(country_text)
    var elem_description = document.createElement('td')
    var desc_text = document.createTextNode(data['data[desc]'])
    elem_description.appendChild(desc_text)
    var elem_edit = document.createElement('td')
    var edit_btn = document.createElement('button')
    var edit_text = document.createTextNode('Edit')
    edit_btn.appendChild(edit_text)
    elem_edit.appendChild(edit_btn)
    var elem_del = document.createElement('td')
    var del_btn = document.createElement('button')
    var del_text = document.createTextNode('delete')
    del_btn.appendChild(del_text)
    elem_del.appendChild(del_btn)
    row.appendChild(elem_id);
    row.appendChild(elem_name);
    row.appendChild(elem_city);
    row.appendChild(elem_country);
    row.appendChild(elem_description);
    row.appendChild(elem_edit)
    row.appendChild(elem_del)
    tbody.appendChild(row)
    del_btn.addEventListener('click',function(){
        // console.log(this.parentElement.parentElement)
        tbody.removeChild(this.parentElement.parentElement);
        $.post('/del',data);
    })
    edit_btn.addEventListener('click',function(){
        update(data)
        // window.location.reload(true)
    })
    
}

function update(data)
{
    console.log()
    $('#inp_id').val(data['data[id]'])
    $('#inp_name').val(data['data[name]'])
    $('#inp_city').val(data['data[city]'])
    $('#inp_country').val(data['data[country]'])
    $('#inp_desc').val(data['data[desc]'])
    $('#inp_table').show()
    $('#inpTblCap').text("Update")
    $('#sub_btn_add_td').hide()
    $('#sub_btn_td').show()
}
});





// function display(data){
//     let text = document.createTextNode(data);
//     let li = document.createElement('li');
//     let del_btn = document.createElement('button');
//     let del_btn_text = document.createTextNode('delete');
//     del_btn.appendChild(del_btn_text);
//     let udt_btn = document.createElement('button');
//     udt_btn.setAttribute('class','UdtBtn');
//     let udt_btn_text = document.createTextNode('update');
//     udt_btn.appendChild(udt_btn_text);
//     li.appendChild(text);
//     li.appendChild(del_btn);
//     li.appendChild(udt_btn);
//     content.appendChild(li);
//     del_btn.addEventListener('click',function(){
//         content.removeChild(this.parentElement);
//         $.post('/del',{'data' : data});
//     })
//     udt_btn.addEventListener('click',function(){
//         update(data)
//     })
//     udt_btn.addEventListener('click',function(){
//         u_div.style.display = 'inline-block';
//         u_btn.addEventListener('click',function(){
//             u_text = u_text.value;
//             console.log(u_text);
//             $.post('/update',{'data': data ,'n_data' : u_text});
//             udt_btn.parentElement.TEXT_NODE = u_text;
//             u_div.style.display = 'none';
//             location.reload();
//         })
//     })
//     let line = document.createElement('hr');
//     li.appendChild(line);   
// }
