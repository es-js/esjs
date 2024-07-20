import { describe, expect, it } from 'vitest'
import { compareDoms } from '../../src/utils/compareDoms'

describe('compareDoms', () => {
  it('should return true for identical trees', () => {
    const tree1 = '<div><span>Content</span></div>'
    const tree2 = '<div><span>Content</span></div>'
    expect(compareDoms(tree1, tree2)).toBe(true)
  })

  it('should return false for trees with different structures', () => {
    const tree1 = '<div><span>Content</span></div>'
    const tree2 = '<div><p>Content</p></div>'
    expect(compareDoms(tree1, tree2)).toBe(false)
  })

  it('should ignore whitespace and return true for visually identical trees', () => {
    const tree1 = '<div>    <span>Content</span>    </div>'
    const tree2 = '<div><span>Content</span></div>'
    expect(compareDoms(tree1, tree2)).toBe(true)
  })

  it.skip('should return true for trees with different but equivalent attribute order', () => {
    const tree1 = '<div id="test" class="example"></div>'
    const tree2 = '<div class="example" id="test"></div>'
    expect(compareDoms(tree1, tree2)).toBe(true)
  })

  it('should return false for trees with different attributes', () => {
    const tree1 = '<div id="test1"></div>'
    const tree2 = '<div id="test2"></div>'
    expect(compareDoms(tree1, tree2)).toBe(false)
  })

  it('should return false for trees with different numbers of nodes', () => {
    const tree1 = '<div><span>Content</span><p>More content</p></div>'
    const tree2 = '<div><span>Content</span></div>'
    expect(compareDoms(tree1, tree2)).toBe(false)
  })

  it('should return true for empty trees', () => {
    const tree1 = ''
    const tree2 = ''
    expect(compareDoms(tree1, tree2)).toBe(true)
  })

  it('should return false when comparing non-empty tree with empty tree', () => {
    const tree1 = '<div></div>'
    const tree2 = ''
    expect(compareDoms(tree1, tree2)).toBe(false)
  })
})
