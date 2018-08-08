$(function () {
	
	var $field_row = '.calc_field_row';
	var $section = '.section';

//клонирование и добавление обертки ниже исходника
function addField() {
	var $clone_child = '';
	var $clone_parent = '';
	var $id = '';
	var $next_id = '';
	var $new_id = '';
	var $parent = '';
		$parent = $(this).closest($field_row);//поиск обертки
		$clone_parent = $parent.clone(); //клонирование обертки
		$id = $('input', $clone_parent).attr('id'); //получаем значение id поля ввода клона обертки 
		$new_id =  $id.replace(/(.*)([0-9])/, nextId);//получаем новый id поля ввода клона обертки
		$($clone_parent).find('input').attr('id', $new_id)//заменяем id на новый у поля ввода клона обертки
		$($parent).after($clone_parent);//добавляем клонированкую обертку с новым id ниже исходника 
	}
//удаление текущей обертки с внутренностями	
function removeField(){
	var $parent = '';
	$parent = $(this).closest($field_row).remove();

}	
//добавление секции с 1 полем
function addSection(){
	var $parent = '';
	$parent = $(this).closest($section);
	$clone_parent = $parent.clone();
	$($parent).after($clone_parent);
	
}
//поиск и добавление id в клон для исключения повторения ( ищет все id в обертках input, вычисляет самый максимальный и и присваивает следующий )
function nextId(id){
	var $lowest_id = 1;
	var $cur_id = id.match(/\d+/);
	var $pre_id = id.match(/[a-z]+/);
	var $arr_id = '';
	$($field_row ).each(function () {
		$arr_id = $(this).find('input').attr('id').match(/\d+/) 
		if	($arr_id > $lowest_id)
			$lowest_id = $(this).find('input').attr('id').match(/\d+/);

	})
	return $pre_id + '_' +(+($lowest_id)+1);
}
//изменение текста лейблов по двойному клику
function changeText(text){
	if ($('body *[contenteditable=true]').length>0){
		$('body *[contenteditable=true]').next('i').remove();
		$('body *[contenteditable=true]').attr('contenteditable', 'false');
		
	}
	else{
		$('body *[contenteditable=false]').attr('contenteditable', 'true');
		$('body *[contenteditable=true]').after ('<i class="far fa-edit"></i>');
	}
}




$(document).on('click', 'button.addField', addField);
$(document).on('click', 'button.remove', removeField);
$(document).on('click', 'button.edit', changeText);
$(document).on('click', 'button.addSection', addSection);


}) //end ready