package linker.dto

import linker.entity.Category

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 12/05/2018
 * Time: 10:44 PM
 */
data class CreateCategoryCommand(
        val title: String,
        val email: String
)

fun CreateCategoryCommand.toDomain(userDto: UserDto, order: Int): Category = Category(
        title = title,
        user = userDto.toDomain(),
        order = order
)