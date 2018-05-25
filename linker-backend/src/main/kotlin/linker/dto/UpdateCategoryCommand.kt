package linker.dto

import linker.entity.Board
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
        val boardId: Long,
        val order: Int
)

fun UpdateCategoryCommand.toDomain(board: Board): Category = Category(
        id = id,
        title = title,
        board = board,
        order = order
)