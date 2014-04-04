describe("#watchFiles", function() {
  var util = module.exports;

  beforeEach(function() {
    jasmine.clock().install();
    this.globValuesSpy = spyOn(util, 'globValues');
    this.files = {};
    this.clientRoot = '/';
    this.runnerOptions = { globbedFiles: 'old files' };
    this.callback = jasmine.createSpy('callback');
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  describe("before an interval period", function() {
    beforeEach(function() {
      util.watchFiles(this.files, this.clientRoot, this.runnerOptions, 1000, this.callback);
      jasmine.clock().tick(999);
    });

    it("should not glob the file list", function() {
      expect(this.globValuesSpy).not.toHaveBeenCalled();
      expect(this.runnerOptions.globbedFiles).toBe('old files');
    });

    it("should not call the provided callback", function() {
      expect(this.callback).not.toHaveBeenCalled();
    });
  });

  describe("after an interval period", function() {
    beforeEach(function() {
      util.watchFiles(this.files, this.clientRoot, this.runnerOptions, 1000, this.callback);
    });

    it("should glob the file list", function() {
      jasmine.clock().tick(1000);
      expect(this.globValuesSpy).toHaveBeenCalled();
    });

    describe("when there are new globbed files", function() {
      beforeEach(function() {
        this.globValuesSpy.and.returnValue('new files');
        jasmine.clock().tick(1000);
      });

      it("should set new globbed files", function() {
        expect(this.runnerOptions.globbedFiles).toBe('new files');
      });

      it("should call the provided callback", function() {
        expect(this.callback).toHaveBeenCalled();
      });
    });

    describe("when there are no new globbed files", function() {
      beforeEach(function() {
        this.globValuesSpy.and.returnValue('old files');
        jasmine.clock().tick(1000);
      });

      it("should not change the globbed files", function() {
        expect(this.runnerOptions.globbedFiles).toBe('old files');
      });

      it("should not call the provided callback", function() {
        expect(this.callback).not.toHaveBeenCalled();
      });
    });
  });
});
