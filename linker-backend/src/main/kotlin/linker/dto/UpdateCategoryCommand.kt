package linker.dto

import linker.entity.Category

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 14/05/2018
 * Time: 11:40 PM
 */
data class UpdateCategoryCommand(
        val id: Long,
        val title: String,
        val user: UserDto,
        val order: Int
)

fun UpdateCategoryCommand.toDomain(): Category = Category(
        id = id,
        title = title,
        user = user.toDomain(),
        order = order
)