package linker.domain.board

import javax.persistence.*

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 25/05/2018
 * Time: 9:17 PM
 */
@Entity
@Table(name = "boards")
data class Board(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long = 0,
        var title: String,
        @field:Column(name = "user_id")
        var userId: Long,
        @field:OneToMany(targetEntity = Category::class)
        @field:JoinColumn(name = "board_id")
        var categories: List<Category>
)