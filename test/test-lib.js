var assert = require( 'assert' )
var fs = require( 'fs' )
var LocalMeta = require( '../' )

var dbFilename = 'test_db.sqlite'

describe( 'LocalMeta', function(){
  var record = {
    fileName: 'cats.png',
    fileSize: 4444,
    mimeType: 'image/png'
  }

  var dbRecord = null

  var engine = new LocalMeta({
    db: dbFilename
  })

  after( function(){
    fs.unlinkSync( dbFilename )
  })

  it( 'should accept new data', function( done ){
    engine.new( record, function( err, data ){
      assert.ifError( err )
      dbRecord = data
      done()
    })
  })

  it( 'should retrieve that data', function( done ){
    engine.get( dbRecord.id, function( err, data ){
      assert.ifError( err )
      done()
    })
  })

  it( 'should return false for a non-existant record', function( done ){
    engine.get( 'fake', function( err, result ){
      assert.ifError( err )
      assert.equal( result, false )
      done()
    })
  })

  it( 'should allow fetching of all records', function( done ){
    engine.all( function( err, result ){
      assert.ifError( err )
      done()
    })
  })

  it( 'should allow patching the filename', function( done ){
    var newFilename = 'chipmunks.png'

    engine.patch( dbRecord.id, {
      fileName: newFilename
    }, function( err, record ){
      assert.equal( record.fileName, newFilename )
      done()
    })
  })
})
