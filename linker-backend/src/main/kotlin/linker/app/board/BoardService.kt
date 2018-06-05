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
    fun updateBoard(command: UpdateBoard): Board
}

@Service
class BoardServiceImpl: BoardService {
    @Autowired
    lateinit var boardRepository: BoardRepository
    @Autowired
    lateinit var categoryRepository: BoardRepository
    @Autowired
    lateinit var userRepository: UserRepository

    override fun findBoardById(id: Long): Optional<Board> = boardRepository.findById(id)

    @Transactional
    override fun updateBoard(command: UpdateBoard): Board {
        var board = boardRepository.findById(command.id).get()
        board = command.board.toDomain(userRepository.findById(2L).get())
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
}