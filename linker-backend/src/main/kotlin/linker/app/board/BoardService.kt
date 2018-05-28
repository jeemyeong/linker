package linker.app.board

import linker.entity.Board
import linker.repository.BoardRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.*

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 28/05/2018
 * Time: 11:31 PM
 */

interface BoardService {
    fun getBoard(id: Long): Optional<Board>
}

@Service
class BoardServiceImpl: BoardService {
    @Autowired
    lateinit var boardRepository: BoardRepository
    override fun getBoard(id: Long): Optional<Board> = boardRepository.findById(id)
}