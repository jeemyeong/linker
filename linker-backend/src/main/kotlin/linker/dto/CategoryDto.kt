package linker.dto

import linker.entity.Category

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 12/05/2018
 * Time: 10:40 PM
 */
data class CategoryDto(
        var id: Long,
        var title: String,
        var user: UserDto,
        val order: Int
) {
    companion object
}

fun CategoryDto.toDomain(): Category = Category(
        id = id,
        title = title,
        user = user.toDomain(),
        order = order
)

fun CategoryDto.Companion.fromDomain(category: Category): CategoryDto = CategoryDto(
        id = category.id,
        title = category.title,
        user = UserDto.fromDomain(category.user),
        order = category.order
)