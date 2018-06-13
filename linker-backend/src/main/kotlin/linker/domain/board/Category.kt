package linker.domain.board

import javax.persistence.*

/**
 * Created by Jeemyeong.
 * User: jeemyeonglee
 * Date: 12/05/2018
 * Time: 10:39 PM
 */

@Entity
@Table(name = "categories")
data class Category(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        var id: Long = 0,
        @field:Column(nullable = false)
        var title: String,
        @field:Column(name = "`order`")
        var order: Int,
        @field:Column(name = "board_id")
        var boardId: Long,
        @field:OneToMany(targetEntity = Link::class, cascade = [CascadeType.ALL], orphanRemoval = true)
        @field:JoinColumn(name = "category_id")
        var links: List<Link>
)
