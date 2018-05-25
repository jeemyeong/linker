package linker.dto

import linker.entity.Board
import linker.entity.Category

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 12/05/2018
 * Time: 10:44 PM
 */
data class CreateCategoryCommand(
        val title: String,
        val boardId: Long
)

fun CreateCategoryCommand.toDomain(board: Board, order: Int): Category = Category(
        title = title,
        board = board,
        order = order
)