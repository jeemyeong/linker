package linker.dto

import linker.entity.Category
import linker.dto.UserDto

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 12/05/2018
 * Time: 10:44 PM
 */
data class CreateCategoryCommand(
        val title: String,
        val email: String,
        val order: Int
)

fun CreateCategoryCommand.toDomain(userDto: UserDto): Category = Category(
        title = title,
        user = userDto.toDomain(),
        order = order
)