package linker.app.board

import linker.app.board.BoardCommand.UpdateBoard
import linker.domain.board.Board
import linker.infra.board.BoardRepository
import linker.infra.user.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.*


/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 28/05/2018
 * Time: 11:31 PM
 */

interface BoardService {
    fun findBoardById(id: Long): Optional<Board>
    fun updateBoard(userId: Long, command: UpdateBoard): Board
    fun findByUserId(userId: Long): List<Board>
    fun newBoard(userId: Long, title: String): Board
    fun deleteBoard(boardId: Long)
}

@Service
class BoardServiceImpl: BoardService {
    @Autowired
    lateinit var boardRepository: BoardRepository
    @Autowired
    lateinit var userRepository: UserRepository

    override fun findBoardById(id: Long): Optional<Board> = boardRepository.findById(id)

    @Transactional
    override fun updateBoard(userId: Long, command: UpdateBoard): Board {
        val board = command.board.toDomain(userRepository.findById(userId).get())
        board.categories = board.categories.mapIndexed { index, category ->
            category.order = index + 1
            category.links.mapIndexed { index, link ->
                link.order = index + 1
                link
            }
            category
        }
        boardRepository.save(board)
        return findBoardById(board.id).get()
    }

    override fun findByUserId(userId: Long): List<Board> {
        return boardRepository.findByUserId(userId)
    }

    override fun newBoard(userId: Long, title: String): Board {
        return boardRepository.save(Board(title = title, userId = userId, categories = emptyList()))
    }

    override fun deleteBoard(boardId: Long) {
        return boardRepository.deleteById(boardId)
    }
}